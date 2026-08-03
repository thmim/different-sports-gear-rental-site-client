"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const providerOwnRentalGetAction = async () => {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/own/orders`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: "no-cache",
        next: {
            revalidate: 60 * 60 * 6,
            tags: ["all-order"]
        }
    })
    const result = await res.json();
    if (!res.ok) {
        return { success: false, message: result.message || "Failed to get order." };
    }
    //    console.log(result,"func")
    return result;
}

// get provider own gear details

export const providerOwnRentalDetailsAction = async (id: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    console.log(id, "rentaldetailsfunc")

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },

        cache: "force-cache",
        next: {
            revalidate: 60 * 60,
            tags: ["owngear-details"]
        }
    })
    const result = await res.json();
    //    console.log(result,"func")
    if (!res.ok) {
        return { success: false, message: result.message || "Failed to update status." };
    }
    return result;
}

// update rental order status

export async function updateOrderStatusAction(orderId: string, newStatus: string) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return { success: false, message: "Unauthorized. Please log in." };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${orderId}/status`, {
            method: "PATCH",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        const result = await res.json();

        if (!res.ok) {
            return { success: false, message: result.message || "Failed to update status." };
        }
        revalidateTag("all-order", {
            expire: 0
        })
        revalidatePath("/provider-dashboard/own-order"); // Path where table lives
        return { success: true, message: "Rental status updated successfully!" };
    } catch (error) {
        console.error("Update Status Error:", error);
        return { success: false, message: "Something went wrong. Try again." };
    }
}