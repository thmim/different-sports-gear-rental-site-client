export type UserRole = "ADMIN" | "PROVIDER" | "CUSTOMER";

export function RoleBadge({ role }: { role: UserRole }) {
  const roleStyles = {
    ADMIN: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
    PROVIDER: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
    CUSTOMER: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        roleStyles[role] || roleStyles.CUSTOMER
      }`}
    >
      {role}
    </span>
  );
}