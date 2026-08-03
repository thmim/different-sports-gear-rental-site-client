"use client";

import { useState, useTransition } from "react";

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReviewAction } from "../_actions/getConfirmedOrder";

export interface CustomerRentalOrder {
  id: string;
  gearItem_id: string;
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

export default function CustomerRentalsList({
  orders = [],
}: {
  orders: CustomerRentalOrder[];
}) {
  const [selectedOrder, setSelectedOrder] = useState<CustomerRentalOrder | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // Badge colors
  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "RETURNED":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">{status}</Badge>;
      case "ACTIVE":
      case "CONFIRMED":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">{status}</Badge>;
      case "PENDING":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Submit Review Form
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOrder) return;

    if (!comment.trim()) {
      alert("Please write a short comment.");
      return;
    }

    startTransition(async () => {
      const res = await createReviewAction({
        rentalOrder_id: selectedOrder.id,
        comment,
        rating,
      });

      if (res.success) {
        alert(res.message);
        setSelectedOrder(null);
        setComment("");
        setRating(5);
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="px-6 py-5 border-b">
        <CardTitle className="text-xl font-bold">My Rental Orders</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Gear Item</TableHead>
                <TableHead>Rental Dates</TableHead>
                <TableHead>Total Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                    No rental history found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => {
                  const isReturned = order.status.toUpperCase() === "RETURNED";

                  return (
                    <TableRow key={order.id} className="hover:bg-slate-50/50">
                      {/* Gear Name */}
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">
                            {order.gearItem?.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {order.gearItem?.brand}
                          </span>
                        </div>
                      </TableCell>

                      {/* Dates */}
                      <TableCell className="text-xs text-slate-600">
                        {formatDate(order.start_date)} – {formatDate(order.end_date)}
                      </TableCell>

                      {/* Price */}
                      <TableCell className="font-bold text-slate-900">
                        ${Number(order.total_amount).toFixed(2)}
                      </TableCell>

                      {/* Status */}
                      <TableCell>{getStatusBadge(order.status)}</TableCell>

                      {/* Review Action */}
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={isReturned ? "default" : "secondary"}
                          disabled={!isReturned}
                          onClick={() => {
                            if (!isReturned) {
                              alert("You can only review gear after it has been returned!");
                              return;
                            }
                            setSelectedOrder(order);
                          }}
                          className="text-xs h-8"
                        >
                          {isReturned ? "Give Review" : "Review Disabled"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* --- SIMPLE REVIEW MODAL --- */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Write a Review</DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Sharing your experience for{" "}
              <span className="font-semibold text-slate-800">
                {selectedOrder?.gearItem?.name}
              </span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitReview} className="space-y-4 mt-2">
            {/* Rating Selector */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Rating (1 to 5 Stars)</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-transform hover:scale-110 ${
                      star <= rating ? "text-amber-400" : "text-slate-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="text-xs font-bold ml-2 text-slate-600">{rating} / 5</span>
              </div>
            </div>

            {/* Comment Area */}
            <div className="space-y-1">
              <Label htmlFor="comment" className="text-xs font-semibold">
                Comment
              </Label>
              <Textarea
                id="comment"
                placeholder="How was the equipment condition and experience?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="text-sm"
                required
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrder(null)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}