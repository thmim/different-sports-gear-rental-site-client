import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export interface ProviderOrder {
  id: string;
  gearItem_id: string;
  customer_id: string;
  total_amount: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  gearItem: {
    id?: string;
    name: string;
    daily_price: string;
    brand?: string;
    description?: string;
    product_image?: string;
    is_available?: boolean;
    condition?: string;
  };
  customer?: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}
export default async function OrderDetailsPage({
  order
}:{
  order: ProviderOrder;
}) {


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/provider-dashboard/own-order">← Back to Orders</Link>
        </Button>
        <Badge variant="outline" className="font-mono text-xs">
          Order ID: {order.id}
        </Badge>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b bg-slate-50/50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">Rental Order Overview</CardTitle>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
              {order.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Customer Section */}
          <div className="p-4 bg-slate-50 rounded-lg space-y-1">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Customer Details
            </h3>
            <p className="font-semibold text-slate-900">{order.customer?.name}</p>
            <p className="text-xs text-slate-500">{order.customer?.email}</p>
          </div>

          {/* Gear Section */}
          <div className="p-4 border rounded-lg space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Gear Information
            </h3>
            <div className="flex items-center gap-4">
              {order.gearItem?.product_image && (
                <img
                  src={order.gearItem.product_image}
                  alt={order.gearItem.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{order.gearItem?.name}</span>
                  {order.gearItem?.brand && (
                    <Badge variant="secondary" className="text-xs">
                      {order.gearItem.brand}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-600">{order.gearItem?.description}</p>
                <span className="text-xs font-medium text-slate-500 block">
                  Condition: {order.gearItem?.condition || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & Rental Schedule Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 border rounded-lg">
              <span className="text-slate-500 block mb-1">Start Date</span>
              <span className="font-semibold text-slate-900">{order.start_date}</span>
            </div>
            <div className="p-3 border rounded-lg">
              <span className="text-slate-500 block mb-1">End Date</span>
              <span className="font-semibold text-slate-900">{order.end_date}</span>
            </div>
            <div className="p-3 border rounded-lg">
              <span className="text-slate-500 block mb-1">Daily Price</span>
              <span className="font-semibold text-slate-900">${order.gearItem?.daily_price}/day</span>
            </div>
            <div className="p-3 border rounded-lg bg-emerald-500/10 border-emerald-200">
              <span className="text-slate-500 block mb-1">Total Revenue</span>
              <span className="font-bold text-emerald-600 text-sm">
                ${Number(order.total_amount).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}