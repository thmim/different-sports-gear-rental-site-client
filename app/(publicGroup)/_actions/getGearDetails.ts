"use server"

export const getGearDetails = async(id:string)=>{
    console.log(id,"detailsfunc")
     const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/users/${id}`,{
    
    cache:"force-cache",
    next:{
        revalidate: 60 * 60 ,
        tags:["single-gear"]
    }
   })
   const result = await res.json();
//    console.log(result,"func")
   return result;
}