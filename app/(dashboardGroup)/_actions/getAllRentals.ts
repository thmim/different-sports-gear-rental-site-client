import { isAccessTokenExist } from "@/services/refreshToken";

export const getAllRentalAction = async () => {

  const accessToken = await isAccessTokenExist()
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