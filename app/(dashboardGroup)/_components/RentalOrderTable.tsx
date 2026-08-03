import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// TypeScript interface based on your API response
export interface RentalOrder {
  id: string;
  gearItem_id: string;
  customer_id: string;
  total_amount: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  gearItem: {
    id: string;
    name: string;
    daily_price: string;
  };
}

interface AdminRentalOrdersTableProps {
  orders: RentalOrder[];
}

export default function AdminRentalOrdersTable({
  orders = [],
}: AdminRentalOrdersTableProps) {
  // Helper to format ISO dates into human-readable strings
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Helper to dynamically style order status badges
  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "PAID":
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400">
            {status}
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400">
            {status}
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400">
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Rental Orders
          </CardTitle>
          <Badge variant="secondary" className="px-3 py-1 font-mono text-xs">
            Total: {orders.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow>
                <TableHead className="w-[120px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Gear Item</TableHead>
                <TableHead>Rental Period</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Created Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-slate-500"
                  >
                    No rental orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    {/* Shortened ID */}
                    <TableCell className="font-mono text-xs text-slate-500">
                      #{order.id.slice(0, 8)}
                    </TableCell>

                    {/* Customer Info */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                          {order.customer?.name || "N/A"}
                        </span>
                        <span className="text-xs text-slate-500">
                          {order.customer?.email || "N/A"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Gear Info */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-slate-800 dark:text-slate-200">
                          {order.gearItem?.name || "Unknown Gear"}
                        </span>
                        <span className="text-xs text-slate-500">
                          ${order.gearItem?.daily_price}/day
                        </span>
                      </div>
                    </TableCell>

                    {/* Rental Dates */}
                    <TableCell className="text-xs text-slate-600 dark:text-slate-300">
                      <div>
                        {formatDate(order.start_date)} –{" "}
                        {formatDate(order.end_date)}
                      </div>
                    </TableCell>

                    {/* Total Amount */}
                    <TableCell className="font-bold text-slate-900 dark:text-slate-100">
                      ${Number(order.total_amount).toFixed(2)}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>{getStatusBadge(order.status)}</TableCell>

                    {/* Created At */}
                    <TableCell className="text-right text-xs text-slate-500">
                      {formatDate(order.created_at)}
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