// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// interface Category {
//   id: string;
//   category_name: string;
// }

// interface Props {
//   categories: Category[];
// }

// export default function CategoryFilter({
//   categories,
// }: Props) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const selectedCategory =
//     searchParams.get("category") || "";

//   const handleCategoryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const params = new URLSearchParams(
//       searchParams.toString()
//     );
//      if (e.target.value) {
//     params.set("category", e.target.value);
//   } else {
//     params.delete("category");
//   }

//   router.push(`?${params.toString()}`);
// };

//     // if (e.target.value) {
//     //   params.set("category", e.target.value);
//     // } else {
//     //   params.delete("category");
//     // }

//     // router.push(`/gears?${params.toString()}`);
//   };

//   return (
//     <div className="mb-6">
//       <label className="mb-2 block text-sm font-medium">
//         Category
//       </label>

//       <select
//         value={selectedCategory}
//         onChange={handleCategoryChange}
//         className="w-64 rounded-md border p-2"
//       >
//         <option value="">All Categories</option>

//         {categories.map((category) => (
//           <option
//             key={category.id}
//             value={category.id}
//           >
//             {category.category_name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GearCategory } from "@/types/gearType";

interface CategoryFilterProps {
  categories: GearCategory[];
}

export default function CategoryFilter({
  categories,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    // Reset page when filter changes
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex items-center gap-3">
      <label
        htmlFor="category"
        className="text-sm font-medium text-slate-700"
      >
        Category:
      </label>

      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
}