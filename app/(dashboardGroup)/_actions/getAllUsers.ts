"use server"

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllUsersForAdmin = async() =>{
    const cookieStore = await cookies();
       
       const accessToken = cookieStore.get("accessToken")?.value;
       
       if(!accessToken){
        return{
            success:false,
            message:"user not logedin"
        }
       }
    
    //    get all users and provide token to the browser cookies through headers
       const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`,{
        headers:{
            Cookie:`accessToken=${accessToken}`
        },
        cache:"force-cache",
        next:{
            revalidate: 60 * 60 * 24,
            tags:["all-users"]
        }
       })
       const result = await res.json();
       
       return result;
    
}





export type RoleActionState = {
  success: boolean;
  message: string;
};

export async function updateUserRoleAction(
  prevState: RoleActionState,
  formData: FormData
): Promise<RoleActionState> {

     const cookieStore = await cookies();
       
       const accessToken = cookieStore.get("accessToken")?.value;
       
       if(!accessToken){
        return{
            success:false,
            message:"user not logedin"
        }
       }
  try {
    const userId = formData.get("userId") as string;
    const newRole = formData.get("role") as "ADMIN" | "PROVIDER" | "CUSTOMER";
    const payload = { role: newRole };
console.log(payload,"payload")
    if (!userId || !newRole) {
      return {
        success: false,
        message: "User ID and Role are required.",
      };
    }

    // Perform database update logic here
     const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,{
        method:"PATCH",
        headers:{
            Cookie:`accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
         body : JSON.stringify(payload)

       })
       if (!res.ok) {
        return {
            success: false,
            message: `Failed to fetch gears: ${res.status}`,
        };
    }
       console.log("Response status:", res.status);
console.log("Response headers:", res.headers);
       const result = await res.json();
           revalidateTag("all-users",{
                   expire : 0
               });
               console.log("Parsed response:", result);
    console.log(`Updating user ${userId} role to ${newRole}`);
const isSuccess = result.success !== undefined ? result.success : true;
    
    if (!isSuccess) {
      return {
        success: false,
        message: result.message || "Failed to update user role"
      };
    }
    
    // Revalidate dashboard path to refresh user data
    revalidatePath("/admin-dashboard/all-users");
 revalidateTag("all-users",{
    expire:0
 });
    return {
      success: true,
      message: `User role successfully updated to ${newRole}.`,
    };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return {
      success: false,
      message: "An unexpected error occurred while updating role.",
    };
  }
}