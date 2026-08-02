import { getAllUsersForAdmin } from "../../_actions/getAllUsers";
import UserManagementTable from "../../_components/UserManagementTable";

export default async function ShowAllUsers() {
    const allUsers = await getAllUsersForAdmin();
    // console.log(allUsers.data,"alluserspage")
  return (
    <div>
        <UserManagementTable users={allUsers.data}></UserManagementTable>
    </div>
  );
}