import { providerOwnRentalGetAction } from "../../_actions/getProviderOwnRental";
import ProviderRentalOrdersTable from "../../_components/ProviderOwnRentalOrderTable";


export default async function ProviderOwnOrder() {
    const allRentals = await providerOwnRentalGetAction();
  return (
    <div className="mx-auto my-16">
        <ProviderRentalOrdersTable orders={allRentals.data}/>
    </div>
  );
}