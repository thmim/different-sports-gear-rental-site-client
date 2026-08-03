"use client";

import { GearItem } from "@/types/gearType";
import GearCardPage from "./gearCards";


interface GearGridProps {
  items: GearItem[];
}

export default function GearGrid({ items }: GearGridProps) {
   
  if (!items || items.length === 0) {
    return (
      <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
        <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
          No gear found
        </p>
        <p className="text-sm text-slate-500">
          Check back later or try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((gear) => (
        <GearCardPage key={gear.id} gear={gear} />
      ))}
    </div>
  );
}