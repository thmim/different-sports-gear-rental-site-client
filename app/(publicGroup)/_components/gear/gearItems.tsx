// import { GearCategory, GearItem } from "@/types/gearType";
// import { getGearItems } from "../../_actions/getGearItems";
// import CategoryFilter from "./CategoryFilter";

// import GearGrid from "./gearGrid";
// interface Props {
//   gears: GearItem[];
//   categories: GearCategory[];
// }

// export default async function GearItemPage({categories}:Props) {
//     const gears = await getGearItems();
//    const gearsInfo = gears.data;
//     // console.log(gears,"gearitempage")
//   return (
//     <div>
//       <CategoryFilter categories={categories} />
//         <GearGrid items={gearsInfo}/>
//     </div>
//   );
// }


import { GearCategory, GearItem } from "@/types/gearType";
import CategoryFilter from "./CategoryFilter";
import GearGrid from "./gearGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  gears: GearItem[];
  categories: GearCategory[];
}

export default function GearItemPage({
  gears,
  categories,
}: Props) {
  return (
    <div>
      {/* Category Filter */}
      <CategoryFilter categories={categories} />

      {/* Empty State */}
      {gears.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-bold">
            No gear found
          </h2>

          <p className="mt-2 text-muted-foreground">
            There are currently no available items in this category.
          </p>

          <Link href="/gears">
            <Button className="mt-6">
              Show All Gear
            </Button>
          </Link>
        </div>
      ) : (
        <GearGrid items={gears} />
      )}
    </div>
  );
}