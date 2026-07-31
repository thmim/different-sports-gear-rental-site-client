import { getGearItems } from "../../_actions/getGearItems";

import GearGrid from "./gearGrid";


export default async function GearItemPage() {
    const gears = await getGearItems();
   const gearsInfo = gears.data;
    // console.log(gears,"gearitempage")
  return (
    <div>
        <GearGrid items={gearsInfo}/>
    </div>
  );
}