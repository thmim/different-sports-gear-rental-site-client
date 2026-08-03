

// import { revalidateTag } from "next/cache"
// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
// import { toast } from "sonner"

// type categoryState = {
//   success:boolean,
//   statusCode:number,
//   message:string,
//   data:Record<string,number>
// }

// export const getCategoryDataAction = async (previousState:categoryState,formData:FormData) =>{
//     // console.log(previousState,"prev")
//     console.log(formData,"cat action")
// const category_name = formData.get("name");
// const description = formData.get("description");
// const image = formData.get("image") || null;
//  const cookieStore = await cookies();

//    const accessToken = cookieStore.get("accessToken")?.value;

//    if(!accessToken){
//     return{
//         success:false,
//         message:"user not logedin"
//     }
//    }

//    const payload = {
//          category_name,
//          description,
//          image
//    }

// const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`,{
//     method:"POST",
//     headers:{
//         Cookie:`accessToken = ${accessToken}`,
//         "Content-Type": "application/json"
//     },
//     body:JSON.stringify(payload)
// })
// const result = await res.json();
// console.log(result)

// if(result.success){
//      revalidateTag("categories", {
//             expire : 0
//         })
//   toast.success("Category created Successfully")
//   }
//  return result;
// }

"use server";

// get category form data and call post api to create category
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    //   console.log(formData, "cat action");

    // ১. ডেটা এক্সট্র্যাক্ট
    const category_name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string | null;

    // ২. বেসিক ভ্যালিডেশন
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

    // ইমেজ ভ্যালিডেশন (অপশনাল)
    if (image && image.trim().length > 0) {
        try {
            new URL(image); // ইউআরএল চেক
        } catch {
            errors.image = "Please enter a valid image URL";
        }
    }

    // যদি ভ্যালিডেশন ফেইল হয়
    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: "Please fix the errors below",
            errors: errors,
        };
    }

    // ৩. টোকেন চেক
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in",
        };
    }

    // ৪. পেলোড তৈরি
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
        console.log(result);

        // ৬. সাফল্য হ্যান্ডেলিং
        if (result.success) {
            revalidateTag("categories", {
                expire: 0
            });
            // রিডাইরেক্ট করতে চাইলে
            // redirect("/dashboard/categories");

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
    
        // console.error("Category creation error:", error);
        // return {
        //     success: false,
        //     message: error.message || "Something went wrong",
        // };
    
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