"use server"
interface GearQuery {
  category?: string;
}

export const getGearItems = async(query?: GearQuery)=>{
    const params = new URLSearchParams();

  if (query?.category) {
    params.set("category", query.category);
  }


     const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear?${params.toString()}`,{
    
    cache : "no-cache",
        next : {
            revalidate : 60 * 60 * 6,
            tags : ["all-gear"]
        }
   })
   const result = await res.json();
//    console.log(result,"func")
   return result;
}