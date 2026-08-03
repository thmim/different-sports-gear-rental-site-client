"use client";

import { useState, useActionState, useEffect, useRef } from "react";
import { UserRole, RoleBadge } from "../_components/RoleBadge";
import { updateUserRoleAction, RoleActionState } from "../_actions/getAllUsers";
import { ShieldCheck, User, Store, Shield, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export interface UserItem {
    "id": string,
    "name": string,
    "email": string,
    "role": string,
    "status": string,
    "created_at": string,
    "updated_at": string
}

interface UserManagementTableProps {
    users: UserItem[];
}

const initialRoleState: RoleActionState = { success: false, message: "" };


export default function UserManagementTable({
    users
}: UserManagementTableProps) {

    const router = useRouter();
    const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
    const [selectedRole, setSelectedRole] = useState<UserRole>("CUSTOMER");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [state, formAction, isPending] = useActionState(
        updateUserRoleAction,
        initialRoleState
    );

    const lastMessageRef = useRef<string | null>(null);

    const handleClose = () => {
  setIsModalOpen(false);
  setSelectedUser(null);
};

  // toast and refresh
  useEffect(() => {
    if (!state.message || state.message === lastMessageRef.current) return;

    lastMessageRef.current = state.message;

    if (state.success) {
      toast.success(state.message, { duration: 3000 });
      router.refresh(); 
     setTimeout(() => {
      handleClose();
    }, 500);
    } else {
      toast.error(state.message, { duration: 4000 });
    }
  }, [state, router]);

  
  useEffect(() => {
    if (!isModalOpen) {
      lastMessageRef.current = null;
    }
  }, [isModalOpen]);

    // Open modal and pre-set current role
    const handleOpenEditRole = (user: UserItem) => {
        setSelectedUser(user);
        setSelectedRole(user.role as UserRole);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        User Management
                    </h1>
                    <p className="text-sm text-slate-500">
                        Manage user permissions, roles, and administrative access.
                    </p>
                </div>
                <div className="text-xs text-slate-500">
                    Total Users: <span className="font-bold text-slate-900 dark:text-slate-100">{users.length}</span>
                </div>
            </div>

            {/* Success/Error Feedback Banner */}
            {/* {state.message && (
                <div
                    className={`p-4 rounded-lg text-sm font-medium ${state.success
                            ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 border border-green-200"
                            : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200"
                        }`}
                >
                    {state.message}
                </div>
            )} */}

            {/* Table Section */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                    <thead className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                        <tr>
                            <th scope="col" className="px-6 py-4">User</th>
                            <th scope="col" className="px-6 py-4">Current Role</th>
                            <th scope="col" className="px-6 py-4">Joined Date</th>
                            <th scope="col" className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                            >
                                {/* User Info */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="px-6 py-4">
                                    <RoleBadge role={user.role as UserRole} />
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4 text-xs text-slate-500">
                                    {user.created_at}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleOpenEditRole(user)}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                                    >
                                        <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
                                        Update Role
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* UPDATE ROLE MODAL */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-4 flex items-center justify-between border-b pb-3 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                Change User Role
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4 text-sm text-slate-500">
                            Select a new access role for{" "}
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {selectedUser.name}
                            </span>{" "}
                            ({selectedUser.email}).
                        </div>

                        <form action={formAction} className="space-y-4">
                            {/* Hidden User ID */}
                            <input type="hidden" name="userId" value={selectedUser.id} />
                            <input type="hidden" name="role" value={selectedRole} />

                            {/* Role Selector Options */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">
                                    Select Access Role
                                </label>

                                <div className="grid grid-cols-1 gap-2">
                                    {/* CUSTOMER Option */}
                                    <label
                                        onClick={() => setSelectedRole("CUSTOMER")}
                                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${selectedRole === "CUSTOMER"
                                                ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20 dark:border-indigo-500 dark:bg-indigo-950/30"
                                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <User className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                                    CUSTOMER
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    Can rent gear and browse marketplace.
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            name="role_radio"
                                            checked={selectedRole === "CUSTOMER"}
                                            onChange={() => setSelectedRole("CUSTOMER")}
                                        />
                                    </label>

                                    {/* PROVIDER Option */}
                                    <label
                                        onClick={() => setSelectedRole("PROVIDER")}
                                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${selectedRole === "PROVIDER"
                                                ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20 dark:border-indigo-500 dark:bg-indigo-950/30"
                                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Store className="h-5 w-5 text-blue-500" />
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                                    PROVIDER
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    Can list gear items and manage bookings.
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            name="role_radio"
                                            checked={selectedRole === "PROVIDER"}
                                            onChange={() => setSelectedRole("PROVIDER")}
                                        />
                                    </label>

                                    {/* ADMIN Option */}
                                    <label
                                        onClick={() => setSelectedRole("ADMIN")}
                                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${selectedRole === "ADMIN"
                                                ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20 dark:border-indigo-500 dark:bg-indigo-950/30"
                                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Shield className="h-5 w-5 text-purple-500" />
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                                    ADMIN
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    Full system access and user management.
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            name="role_radio"
                                            checked={selectedRole === "ADMIN"}
                                            onChange={() => setSelectedRole("ADMIN")}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {isPending ? "Updating..." : "Save Role"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}