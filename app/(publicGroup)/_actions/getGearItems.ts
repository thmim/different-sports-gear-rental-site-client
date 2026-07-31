"use server"

export const getGearItems = async()=>{
     const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`,{
    
    cache:"force-cache",
    next:{
        revalidate: 60 * 60 * 24,
        tags:["all-gear"]
    }
   })
   const result = await res.json();
//    console.log(result,"func")
   return result;
}