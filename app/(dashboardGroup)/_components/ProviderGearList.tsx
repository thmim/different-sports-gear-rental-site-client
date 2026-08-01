"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Pencil,
  Trash2,
  PlusCircle,
  Tag,
  Package,
  AlertCircle,
} from "lucide-react";
import CreateGearModal, { GearFormData } from "./CreateGearModal";
import { GearItem } from "@/types/gearType";


// Initial mock gear list
const INITIAL_MY_GEAR = [
  {
    id: "g-101",
    name: "Adidas Wind-proof Outdoor Boot",
    brand: "Adidas",
    category_id: "d9206419-8914-470d-b4dd-b8f0b9bf860c",
    category_name: "Soccer",
    daily_price: "20.00",
    quantity: "3",
    condition: "FAIR" as const,
    product_image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
    description: "Durable wind-proof boots suitable for trail running and sports.",
  },
  {
    id: "g-102",
    name: "Sony FX3 Full-Frame Cinema Camera",
    brand: "Sony",
    category_id: "c1016419-8914-470d-b4dd-b8f0b9bf860a",
    category_name: "Photography & Video",
    daily_price: "85.00",
    quantity: "1",
    condition: "EXCELLENT" as const,
    product_image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop",
    description: "Professional camera with XLR handle kit, ready for video shoots.",
  },
];

const CONDITION_STYLES: Record<string, string> = {
  NEW: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200",
  LIKE_NEW: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200",
  GOOD: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200",
  FAIR: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 border-orange-200",
  POOR: "bg-red-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 border-orange-200",
};

interface GearCardProps {
  gears: GearItem[]; 
}

export default function ProviderGearListPage({gears}:GearCardProps) {
    // console.log(gears,"card")
    // console.log(typeof(gears),"card")
    // const geartype = Array.isArray(gears)
    // console.log(geartype,"check")
  const [gearList, setGearList] = useState(INITIAL_MY_GEAR);
  const [selectedGearForEdit, setSelectedGearForEdit] =
    useState<GearFormData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Delete Handler
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gear listing?"
    );
    if (!confirmDelete) return;

    try {
      // Optional API Call:
      // await fetch(`/api/gear/${id}`, { method: 'DELETE' });

      setGearList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete gear:", err);
    }
  };

  // Edit Trigger Handler
  const handleOpenEdit = (gears: GearItem) => {
    // setSelectedGearForEdit({
    //   id: gears.id,
    //   name: gears.name,
    //   brand: gears.brand,
    //   category_id: gears.category_id,
    //   daily_price: gears.daily_price,
    //   quantity: gears.quantity,
    //   condition: gears.condition,
    //   product_image: gears.product_image,
    //   description: gears.description,
      
    // });
    // setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            My Gear Listings
          </h1>
          <p className="text-sm text-slate-500">
            Manage your inventory, prices, and available rental equipment.
          </p>
        </div>

        {/* Create Gear Trigger */}
        <CreateGearModal
          onSuccess={() => {
            // Re-fetch or update list logic here
          }}
        />
      </div>

      {/* Edit Gear Modal Instance */}
      <CreateGearModal
        initialData={selectedGearForEdit}
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSuccess={() => {
          setIsEditModalOpen(false);
          setSelectedGearForEdit(null);
        }}
      />

      {/* Gear Grid */}
      {gearList.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
          <AlertCircle className="h-10 w-10 text-slate-400" />
          <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
            No gear listed yet
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Get started by adding your first rental gear item.
          </p>
          <div className="mt-4">
            <CreateGearModal />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {gears.map((gear) => (
            <Card
              key={gear.id}
              className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md dark:border-slate-800"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900">
                  <img
                    src={gear.product_image}
                    alt={gear.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop";
                    }}
                  />
                  <Badge
                    variant="outline"
                    className={`absolute right-3 top-3 border ${
                      CONDITION_STYLES[gear.condition]
                    }`}
                  >
                    {gear.condition}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-3 p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <Tag className="h-3.5 w-3.5" />
                  <span>{gear.brand}</span>
                  <span>•</span>
                  <span className="text-slate-500">{gear.category?.category_name}</span>
                </div>

                <h3 className="line-clamp-1 font-bold text-slate-900 dark:text-slate-100">
                  {gear.name}
                </h3>

                <p className="line-clamp-2 text-xs text-slate-500">
                  {gear.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                      ${gear.daily_price}
                    </span>
                    <span className="text-xs text-slate-500"> / day</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Package className="h-3.5 w-3.5" />
                    <span>{gear.quantity} in stock</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 border-t border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/50">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5"
                  onClick={() => handleOpenEdit(gear)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50"
                  onClick={() => handleDelete(gear.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}