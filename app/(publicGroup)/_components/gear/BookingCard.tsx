"use client";

import { useState, useActionState, useEffect } from "react";
import { Calendar, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createRentalOrderAction, OrderActionState } from "../../_actions/createRentalOrder";
import { GearCategory, GearItemDetails, GearProvider } from "@/types/gearType";
import { useRouter } from "next/navigation";

interface BookingFormCardProps {
gearData:GearItemDetails
}

const getInitialDates = () => {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  return { today, tomorrow };
};

const initialState: OrderActionState = { success: false, message: "" };

export default function BookingFormCard({ gearData }: BookingFormCardProps) {

    const router = useRouter();
//  get todays tomorrows date for form validation
const { today, tomorrow } = useState(getInitialDates)[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(tomorrow);

  const [state, formAction, isPending] = useActionState(
    createRentalOrderAction,
    initialState
  );

  // Client-side redirect to SSLCommerz
  useEffect(() => {
    if (state.success && state.paymentUrl) {
    //   window.location.href = state.paymentUrl;
    router.push(state.paymentUrl)
    }
  }, [state.success, state.paymentUrl,router]);

  // Calculate rental duration in days
  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const rentalDays = calculateDays();
  const totalPrice = (rentalDays * parseFloat(gearData.daily_price)).toFixed(2);
  const isAvailable = gearData.is_available !== false && gearData.quantity > 0;

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24 border-slate-200 shadow-lg dark:border-slate-800">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                ${gearData.daily_price}
              </span>
              <span className="text-sm font-normal text-slate-500"> / day</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Verified Gear
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form action={formAction} className="space-y-6">
            {/* Hidden Inputs to pass to Server Action */}
            <input type="hidden" name="gearId" value={gearData.id} />
            <input type="hidden" name="startDate" value={startDate} />
            <input type="hidden" name="endDate" value={endDate} />
            <input type="hidden" name="totalDays" value={rentalDays} />
            <input type="hidden" name="totalPrice" value={totalPrice} />

            {/* Response Banner */}
            {/* {state.message && (
              <div
                className={`p-3 rounded-lg text-xs font-medium ${
                  state.success
                    ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 border border-green-200"
                    : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200"
                }`}
              >
                {state.message}
              </div>
            )} */}


            {/* Date Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Start Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs font-medium dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  End Date
                </label>
                <input
                  type="date"
                  min={startDate || today}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs font-medium dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-900">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>
                  ${gearData.daily_price} × {rentalDays} {rentalDays === 1 ? "day" : "days"}
                </span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Service fee</span>
                <span>$0.00</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-slate-100">
                <span>Total Estimate</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            {/* Booking Button */}
            <Button
              type="submit"
              className="w-full text-base font-semibold py-6"
              disabled={!isAvailable || rentalDays <= 0 || isPending}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {isPending
                ? "Submitting Request..."
                : !isAvailable
                ? "Currently Unavailable"
                : "Request Booking"}
            </Button>
          </form>

          <p className="text-center text-[11px] text-slate-500">
            You won&apos;t be charged until the gear owner accepts your request.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}