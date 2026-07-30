import { getGearItems } from "../_actions/getGearItems";
import GearItemPage from "../_components/gear/gearItems";

export default async function GearPage() {
    // const gears = await getGearItems();
        // console.log(gears.data,"gearpage")
  return (
    <div className="max-w-7xl mx-auto mt-10">
        <GearItemPage/>
    </div>
  );
}