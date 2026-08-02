"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

type loginState = {
  success: boolean,
  statusCode: number,
  message: string,
  data: {
    accessToken: string,
    refreshToken: string,
  }
}

export const loginAction = async (previousState: loginState, formData: FormData) => {
  // console.log(previousState,"prev")

  const email = formData.get("email")
  const password = formData.get("password")

  const payload = {
    email,
    password
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  const result = await res.json();
  

  if (result.success) {
    const cookieStore = await cookies();
    // set access token
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, //1 day
      sameSite: "lax"
    })

    // set refresh token
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 7 * 24, //7 day
      sameSite: "lax"
    })

    const decoded = jwt.decode(result.data.accessToken) as JwtPayload;
    
    if (decoded.role === "CUSTOMER") {
      redirect("/customer-dashboard", "push");
    } else if (decoded.role === "ADMIN") {
      redirect("/admin-dashboard", "push");
    } else {
      redirect("/provider-dashboard", "push");
    }

  }
  return result;

}





