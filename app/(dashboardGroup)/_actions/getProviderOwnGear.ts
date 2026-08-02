"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getProviderListingGear = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {

        return {
            success: false,
            message: "User not logged in!"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/own/gear-list`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },

        cache: "no-store",
        // next : {
        //     revalidate : 60 , // 1day
        //     tags : ["my-gears"]
        // }
    });
    if (!res.ok) {
        return {
            success: false,
            message: `Failed to fetch gears: ${res.status}`,
        };
    }

    const result = await res.json();
    // console.log(result,"result")

    return result;
}


export type ActionState = {
    success: boolean;
    message: string;
    errors?: Record<string, string>;
};

// create gear or update gear
export async function upsertGearAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const brand = formData.get("brand") as string;
    const category_name = formData.get("category_name") as string;
    const daily_price = Number(formData.get("daily_price"));
    const quantity = Number(formData.get("quantity"));
    const condition = formData.get("condition") as string;
    const description = formData.get("description") as string;
    const product_image = formData.get("product_image") as string | null;

    // Validation
    if (!name || !daily_price || !category_name || !quantity || !condition) {
      return {
        success: false,
        message: "Please fill out all required fields.",
      };
    }

    const isEdit = Boolean(id);

    const payload = isEdit
      ? { id, name, brand, daily_price, quantity, condition, description, product_image }
      : { name, brand, category_name, daily_price, quantity, condition, description, product_image };

    const url = isEdit
      ? `${process.env.BACKEND_API_URL}/api/provider/gear/${id}`
      : `${process.env.BACKEND_API_URL}/api/provider/gear`;

    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Something went wrong",
      };
    }

    // Revalidate the correct things
    revalidatePath("/provider-dashboard/listings");
    // If you later add tags in the GET actions, revalidate them too:
    // revalidateTag("my-gears");
    // revalidateTag("categories");

    return {
      success: true,
      message: isEdit ? "Gear updated successfully!" : "Gear created successfully!",
    };
  } catch (error) {
    console.error("Failed to upsert gear:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

// delete gear
export async function deleteGearAction(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {

        return {
            success: false,
            message: "User not logged in!"
        }
    }

    try {
        const id = formData.get("id") as string;

        if (!id) {
            return { success: false, message: "Gear ID is required for deletion." };
        }

        // delete gear
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear/${id}`, {
      method:"DELETE",
        headers: {
            Cookie: `accessToken=${accessToken}`
        },

        cache: "no-store",
        
    });
    if (!res.ok) {
        return {
            success: false,
            message: `Failed to fetch gears: ${res.status}`,
        };
    }

    const result = await res.json();
    revalidateTag("all-gears",{
            expire : 0
        });
    revalidateTag("single-gear",{
            expire : 0
        });
    // console.log(result,"result")

        return { success: true, message: "Gear deleted successfully." };
    } catch (error) {
        console.error("Failed to delete gear:", error);
        return {
            success: false,
            message: "Could not delete gear. Try again.",
        };
    }
    
}

