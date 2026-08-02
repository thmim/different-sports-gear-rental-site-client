import { Suspense } from "react";
import { getAllCategoryAction } from "../../_actions/getCategoryFormData";
import { getProviderListingGear } from "../../_actions/getProviderOwnGear";
import ProviderGearListPage from "../../_components/ProviderGearList";
import { Skeleton } from "@/components/ui/skeleton";

export default async function GearListingPage() {
  const gearList = await getProviderListingGear();
  const categories = await getAllCategoryAction();
  // console.log(categories)
  // console.log(typeof(gearList.data),"gearlistdata")
  // console.log(gearList.data,"gearlistpage")
  return (
    <div>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ProviderGearListPage
          gears={gearList.data}
          categories={categories.data} />
      </Suspense>

    </div>
  );
}