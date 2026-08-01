import { getProviderListingGear } from "../../_actions/getProviderOwnGear";
import ProviderGearListPage from "../../_components/ProviderGearList";

export default async function GearListingPage() {
  const gearList = await getProviderListingGear();
  console.log(typeof(gearList.data),"gearlistdata")
  console.log(gearList.data,"gearlistpage")
  return (
    <div>
      <ProviderGearListPage gears={gearList.data}/>
    </div>
  );
}