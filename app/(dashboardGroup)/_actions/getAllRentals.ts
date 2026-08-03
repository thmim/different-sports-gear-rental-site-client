import { cookies } from "next/headers";

export const getAllRentalAction = async() =>{
    const cookieStore = await cookies();
    
      const accessToken = cookieStore.get("accessToken")?.value;
    
      if (!accessToken) {
        return {
          success: false,
          message: "user not logedin"
        }
      }
    
      //    get all rental order and provide token to the browser cookies through headers
      const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/order`, {
        headers: {
          Cookie: `accessToken=${accessToken}`
        },
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24,
          tags: ["all-rentals"]
        }
      })
      const result = await res.json();
    
      return result;
    
}