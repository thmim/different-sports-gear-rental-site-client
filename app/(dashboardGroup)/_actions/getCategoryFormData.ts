"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type loginState = {
  success:boolean,
  statusCode:number,
  message:string,
  data:Record<string, any>
}

export const getCategoryDataAction = async (previousState:loginState,formData:FormData) =>{
    // console.log(previousState,"prev")
const name = formData.get("name");
const description = formData.get("description");
const image = formData.get("image");
 const cookieStore = await cookies();
   
   const accessToken = cookieStore.get("accessToken")?.value;
   
   if(!accessToken){
    return{
        success:false,
        message:"user not logedin"
    }
   }

   const payload = {
         name,
         description,
         image
   }

const res = await fetch(`${process.env.BACKEND_API_URL}/api/api/categories`,{
    method:"POST",
    headers:{
        Cookie:`accessToken = ${accessToken}`,
        "Content-Type": "application/json"
    },
    body:JSON.stringify(payload)
})
const result = await res.json();
console.log(result)

if(result.success){
     revalidateTag("my-posts", {
            expire : 0
        })
  
  }
 return result;
}