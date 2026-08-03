import { getAllRentalAction } from "../../_actions/getAllRentals";
import AdminRentalOrdersTable from "../../_components/RentalOrderTable";

export default async function AllRentalOrderPage() {
    const allOrders = await getAllRentalAction();
    console.log(allOrders,"allrentalaction")
  return (
    <div className="mx-auto my-16">
        <AdminRentalOrdersTable orders={allOrders.data}/>
    </div>
  );
}