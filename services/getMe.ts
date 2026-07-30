"use server"

import { cookies } from "next/headers"

export const getMe = async ()=>{
   const cookieStore = await cookies();
   
   const accessToken = cookieStore.get("accessToken")?.value;
   
   if(!accessToken){
    return{
        success:false,
        message:"user not logedin"
    }
   }

//    get login user and provide token to the browser cookies through headers
   const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`,{
    headers:{
        Cookie:`accessToken = ${accessToken}`
    },
    cache:"force-cache",
    next:{
        revalidate: 60 * 60 * 24,
        tags:["my-profile"]
    }
   })
   const result = res.json();
   
   return result;

}