"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type loginState = {
  success:boolean,
  statusCode:number,
  message:string,
  data:{
    accessToken:string,
    refreshToken:string,
  }
}

export const loginAction = async (previousState:loginState,formData:FormData) =>{
    // console.log(previousState,"prev")

const email = formData.get("email")
const password = formData.get("password")

const payload = {
    email,
    password
}

const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`,{
    method:"POST",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(payload)
})
const result = await res.json();
console.log(result)

if(result.success){
    const cookieStore = await cookies();
    // set access token
  cookieStore.set("accessToken",result.data.accessToken,{
    httpOnly:true,
    maxAge:60* 60 * 24, //1 day
    sameSite:"lax"
  })

  // set refresh token
  cookieStore.set("refreshToken",result.data.refreshToken,{
    httpOnly:true,
    maxAge:60* 60 * 7 * 24, //7 day
    sameSite:"lax"
  })

 redirect("/customer-dashboard","replace");  // redirect users desire page after successful login
  
  }
 return result;
 
}



// register action
// export const registerAction = async(formData:FormData) =>{
// console.log(formData)
// const name = formData.get("fullName")
// const email = formData.get("email")
// const password = formData.get("password")
// const confirmPassword = formData.get("confirmPassword")

// // if password does not match
// if (password !== confirmPassword) {
//     return {
//       success: false,
//       message: "Passwords do not match",
//     };
//   }


//   const payload = {
//       name: String(name).trim(),
//       email: String(email).trim(),
//       password,
//     };

//   const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`,{
//     method:"POST",
//     headers:{
//         "content-type":"application/json"
//     },
//     body:JSON.stringify(payload)
// })
// const result = await res.json();
// if(result.success){
// redirect("/login","replace");
// }
// console.log(result)
// return result;

// }


// export const registerAction = async (formData: FormData) => {
//   "use server"
//   console.log(formData)
//   const name = formData.get("fullName");
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const confirmPassword = formData.get("confirmPassword");

//   if (password !== confirmPassword) {
//     console.log("not matched")
//     return {
//       success: false,
//       message: "Passwords do not match",
//     };
//   }

//   try {
//     const payload = {
//       name: String(name).trim(),
//       email: String(email).trim(),
//       password,
//     };

//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/auth/register`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       }
//     );
// console.log(res,"response")
//     const result = await res.json();
// console.log(result,"fetch result")
// console.log(result.success,"fetch result")
//     if (result.success) {
//       redirect("/login");
//     }

//     return result;
//   } catch {
//     return {
//       success: false,
//       message: "Failed to register. Please try again.",
//     };
//   }
// };

