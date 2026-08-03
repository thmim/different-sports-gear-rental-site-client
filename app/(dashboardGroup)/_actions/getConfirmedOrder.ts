"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
import { revalidatePath, revalidateTag } from "next/cache";


// get all paid rental order
export const getPaidRentalOrderAction = async()=>{
    
      const accessToken = await isAccessTokenExist()
    
      //    get all rental order and provide token to the browser cookies through headers
      const res = await fetch(`${process.env.BACKEND_API_URL}/api/customer/confirmed/rental`, {
        headers: {
          Cookie: `accessToken=${accessToken}`
        },
        cache: "no-cache",
        next: {
          revalidate: 60 * 60 * 24,
          tags: ["all-paidRent"]
        }
      })
      const result = await res.json();
    
      return result;
    
}



// create review
export async function createReviewAction(payload: {
  rentalOrder_id: string;
  comment: string;
  rating: number;
}) {
  const accessToken = await isAccessTokenExist()

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: {
       Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || "Failed to submit review." };
    }

    revalidatePath("/customer-dashboard/");
    revalidateTag("all-paidRent",{
        expire:0
    })

    return { success: true, message: "Review submitted successfully!" };
  } catch (error) {
    console.error("Create Review Error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}