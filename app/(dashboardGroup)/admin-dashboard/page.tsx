import { getAllUsersForAdmin } from "../_actions/getAllUsers";

export default async function AdminDashboardPage() {
  const allUsers = await getAllUsersForAdmin();
  return (
    <div>AdminDashboardPage
      <p>{allUsers.data.length}</p>
    </div>
  );
}