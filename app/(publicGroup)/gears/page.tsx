// import { Suspense } from "react";
// import { getGearItems } from "../_actions/getGearItems";
// import GearItemPage from "../_components/gear/gearItems";
// import { SkeletonCard } from "../_components/gear/skeleton";

// export default async function GearPage() {
//   // const gears = await getGearItems();
//   // console.log(gears.data,"gearpage")
//   return (
//     <div className="max-w-7xl mx-auto mt-10">
//       <Suspense fallback={<SkeletonCard/>}>
//         <GearItemPage />
//       </Suspense>

//     </div>
//   );
// }

import { getAllCategoryAction } from "@/app/(dashboardGroup)/_actions/getCategoryFormData";
import { getGearItems } from "../_actions/getGearItems";
import GearItemPage from "../_components/gear/gearItems";

interface Props {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function GearPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const [gearResult, categoryResult] = await Promise.all([
    getGearItems({
      category: params.category,
    }),
    getAllCategoryAction(),
  ]);

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <GearItemPage
        gears={gearResult.data}
        categories={categoryResult.data}
      />
    </div>
  );
}