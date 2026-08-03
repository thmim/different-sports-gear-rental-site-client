"use client";

import { useTransition } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateOrderStatusAction } from "../_actions/getProviderOwnRental";

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "ACTIVE", "RETURNED", "CANCELED"];

export interface ProviderOrder {
  id: string;
  gearItem_id: string;
  customer_id: string;
  total_amount: string;
  start_date: string;
  end_date: string;
  status: string;
  gearItem: {
    name: string;
    brand?: string;
    daily_price: string;
  };
}

export default function ProviderRentalOrdersTable({
  orders = [],
}: {
  orders: ProviderOrder[];
}) {
  const [isPending, startTransition] = useTransition();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
      case "CONFIRMED":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">{status}</Badge>;
      case "PENDING":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">{status}</Badge>;
      case "RETURNED":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">{status}</Badge>;
      case "CANCELED":
      case "CANCELLED":
        return <Badge className="bg-rose-500/10 text-rose-600 border-rose-200">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateOrderStatusAction(orderId, newStatus);
      if (!res.success) {
        alert(res.message);
      }
    });
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="px-6 py-5 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Rental Requests</CardTitle>
          <Badge variant="secondary" className="font-mono text-xs">
            Total Orders: {orders.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Gear Item</TableHead>
                <TableHead>Rental Period</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Update Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-slate-50/50">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{order.gearItem?.name}</span>
                        <span className="text-xs text-slate-500">
                          {order.gearItem?.brand} • ${order.gearItem?.daily_price}/day
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs text-slate-600">
                      {formatDate(order.start_date)} – {formatDate(order.end_date)}
                    </TableCell>

                    <TableCell className="font-bold text-slate-900">
                      ${Number(order.total_amount).toFixed(2)}
                    </TableCell>

                    <TableCell>{getStatusBadge(order.status)}</TableCell>

                    <TableCell>
                      <Select
                        disabled={isPending}
                        defaultValue={order.status}
                        onValueChange={(val) => handleStatusChange(order.id, val)}
                      >
                        <SelectTrigger className="w-[130px] h-8 text-xs">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status} className="text-xs">
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Dynamic Page Navigation */}
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm" className="text-xs h-8">
                        <Link href={`/provider-dashboard/own-order/${order.id}`}>
                          See Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}