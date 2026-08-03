"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export type OrderActionState = {
  success: boolean;
  message: string;
  paymentUrl?: string;
};

export async function createRentalOrderAction(
  prevState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  try {
    const gearItem_id = formData.get("gearId") as string;
    const start_date = formData.get("startDate") as string;
    const end_date = formData.get("endDate") as string;
    const totalDays = Number(formData.get("totalDays"));
    const totalPrice = Number(formData.get("totalPrice"));

    const payload = {
      gearItem_id,
      start_date,
      end_date,
    };

    // Validation
    if (!gearItem_id || !start_date || !end_date) {
      return {
        success: false,
        message: "Please select both a start date and an end date.",
      };
    }

    if (totalDays <= 0) {
      return {
        success: false,
        message: "End date must be after the start date.",
      };
    }

    console.log("Creating order:", {
      gearItem_id,
      start_date,
      end_date,
      totalDays,
      totalPrice,
    });

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result, "payresult");

    if (result.success && result.data?.paymentUrl) {
      return {
        success: true,
        message: "Redirecting to payment gateway...",
        paymentUrl: result.data.paymentUrl,
      };

    }
    revalidateTag("all-gear", {
          expire: 0
        });
    revalidateTag("all-rentals", {
          expire: 0
        });

    return {
      success: result.success || false,
      message: result.message || "Booking request submitted successfully!",
    };
  } catch (error) {
    console.error("Failed to create rental order:", error);
    return {
      success: false,
      message: "Could not submit booking request. Please try again.",
    };
  }
}