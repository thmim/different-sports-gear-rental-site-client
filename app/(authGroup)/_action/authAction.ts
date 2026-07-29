"use server"
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
    console.log(previousState,"prev")

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
if(!result.success){
    // console.log("parla na")
    // showing user not found toast here
}
 return result;
 
}

