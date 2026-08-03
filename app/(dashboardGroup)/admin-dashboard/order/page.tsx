import { getAllRentalAction } from "../../_actions/getAllRentals";
import AdminRentalOrdersTable from "../../_components/RentalOrderTable";

export default async function AllRentalOrderPage() {
    const allOrders = await getAllRentalAction();
   
  return (
    <div className="mx-auto my-16">
        <AdminRentalOrdersTable orders={allOrders.data}/>
    </div>
  );
}