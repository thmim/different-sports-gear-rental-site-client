

"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
// get category form data and call post api to create category
import { revalidateTag } from "next/cache";

type CategoryState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: {
        result: {
            id: string;
            category_name: string;
            description: string;
            image?: string | null;
            created_at: string;
            updated_at: string;
        }

    } | null;
    errors?: {
        name?: string;
        description?: string;
        image?: string;
    };
};

export const getCategoryDataAction = async (
    previousState: CategoryState,
    formData: FormData
): Promise<CategoryState> => {
    
    const category_name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string | null;

    const errors: { name?: string; description?: string; image?: string } = {};

    if (!category_name || category_name.trim().length === 0) {
        errors.name = "Category name is required";
    } else if (category_name.trim().length < 2) {
        errors.name = "Category name must be at least 2 characters";
    } else if (category_name.trim().length > 50) {
        errors.name = "Category name must not exceed 50 characters";
    }

    if (!description || description.trim().length === 0) {
        errors.description = "Description is required";
    } else if (description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters";
    } else if (description.trim().length > 500) {
        errors.description = "Description must not exceed 500 characters";
    }

    
    if (image && image.trim().length > 0) {
        try {
            new URL(image); 
        } catch {
            errors.image = "Please enter a valid image URL";
        }
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: "Please fix the errors below",
            errors: errors,
        };
    }

    const accessToken = await isAccessTokenExist()

    const payload = {
        category_name: category_name.trim(),
        description: description.trim(),
        image: image?.trim() || null,
    };

    
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
            method: "POST",
            headers: {
                Cookie: `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();
        

      
        if (result.success) {
            revalidateTag("categories", {
                expire: 0
            });

            return {
                success: true,
                message: "Category created successfully",
                data: result.data,
            };
        } else {
            return {
                success: false,
                message: result.message || "Failed to create category",
                statusCode: result.statusCode,
            };
        }
    
    
};


// get all category
export const getAllCategoryAction = async()=>{
     
    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 24, // 1 day
                tags: ["categories"]
            }
        });
        if (!res.ok) {
      return {
        success: false,
        message: `Failed to fetch categories: ${res.status}`,
      };
    }
    
        const result = await res.json();
    
    
        return result;
}