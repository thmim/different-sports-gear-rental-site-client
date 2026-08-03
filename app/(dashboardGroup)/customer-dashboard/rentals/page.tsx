import { getPaidRentalOrderAction } from "../../_actions/getConfirmedOrder";
import CustomerRentalsList from "../../_components/CustomerPaidRentalList";

export default async function MyRentalsPage() {
const confirmedOrders = await getPaidRentalOrderAction();

  return (
    <div className="mx-auto my-16">
      <CustomerRentalsList orders={confirmedOrders.data}/>
    </div>
  );
}