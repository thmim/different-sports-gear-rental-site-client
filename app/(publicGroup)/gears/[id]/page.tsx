import { getGearDetails } from "../../_actions/getGearDetails";
import GearDetailsCard from "../../_components/gear/gearDetailsCard";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const {id} = await params;
    const gear = await getGearDetails(id);
    // console.log(gear,"detailspage")
  return (
    <div>
        <GearDetailsCard gearData={gear.data}/>
    </div>
  );
}