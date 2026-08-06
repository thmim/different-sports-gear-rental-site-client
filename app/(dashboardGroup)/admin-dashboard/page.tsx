import { getAllRentalAction } from "../_actions/getAllRentals";
import { getAllUsersForAdmin } from "../_actions/getAllUsers";
import { getAllCategoryAction } from "../_actions/getCategoryFormData";

export default async function AdminDashboardPage() {
  const allUsers = await getAllUsersForAdmin();
  const allOrders = await getAllRentalAction();
  const allCategories = await getAllCategoryAction();
  return (
    <div>AdminDashboardPage
      {/* <p>{allUsers.data.length}</p>
      <p>{allOrders.data.length}</p>
      <p>{allCategories.data.length}</p> */}
      <div className="md:flex justify-center gap-10 items-center">
        <div className="border border-yellow-200 shadow-2xl px-8 py-4">{allUsers.data.length}</div>
        <div className="border border-yellow-200 shadow-2xl px-8 py-4">{allOrders.data.length}</div>
        <div className="border border-yellow-200 shadow-2xl px-8 py-4">{allCategories.data.length}</div>
      </div>
    </div>
  );
}