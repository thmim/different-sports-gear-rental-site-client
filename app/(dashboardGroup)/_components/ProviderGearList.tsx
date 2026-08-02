"use client";

import { useState, useActionState, useEffect } from "react";
import { AlertCircle, Tag, Package, Pencil, Trash2, Plus } from "lucide-react";
import CreateGearModal from "./CreateGearModal";
import { GearCategory, GearItem } from "@/types/gearType";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActionState, deleteGearAction } from "../_actions/getProviderOwnGear";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// interface GearListPageProps {
//   gears: GearItem[];
// }
interface GearAndCategoryProps {
  gears: GearItem[];
  categories: GearCategory[];
}

const initialDeleteState: ActionState = { success: false, message: "" };

export default function ProviderGearListPage({ gears = [], categories = [] }: GearAndCategoryProps) {
  // console.log(gears,"list")
  const [selectedGearForEdit, setSelectedGearForEdit] = useState<GearItem | null>(null);
  //   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
const router = useRouter();
  // Delete Action Hook
  const [deleteState, deleteAction, isDeletePending] = useActionState(
    deleteGearAction,
    initialDeleteState
  );

  // Trigger Create
  const handleOpenCreate = () => {
    setSelectedGearForEdit(null); // Clear edit data
    setIsModalOpen(true);
  };

  const handleOpenEdit = (gear: GearItem) => {
    setSelectedGearForEdit(gear);
    setIsModalOpen(true);
  };

  useEffect(() => {
  if (!deleteState.message) return;

  if (deleteState.success) {
    toast.success(deleteState.message);
    router.refresh();
  } else {
    toast.error(deleteState.message);
  }
}, [deleteState.message, deleteState.success,router]);

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

        {/* Standard Button to Trigger Create */}
        <Button onClick={handleOpenCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Gear
        </Button>
      </div>

      {/* single modal for create and edit */}
      
      {/* <CreateGearModal
        initialData={selectedGearForEdit}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        categories={categories}
        onSuccess={() => setSelectedGearForEdit(null)}
      /> */}

      {isModalOpen && (
  <CreateGearModal
    initialData={selectedGearForEdit}
    isOpen={isModalOpen}
    onOpenChange={setIsModalOpen}
    categories={categories}
    onSuccess={() => {
      setSelectedGearForEdit(null);
      setIsModalOpen(false);
    }}
  />
)}

      {/* Feedback banner for Delete Operations */}
      {/* {deleteState.message && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm ${deleteState.success
              ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300"
              : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
            }`}
        >
          {deleteState.message}
        </div>
      )} */}

      {/* Empty State */}
      {gears.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
          <AlertCircle className="h-10 w-10 text-slate-400" />
          <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
            No gear listed yet
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Get started by adding your first rental gear item.
          </p>
          <div className="mt-4">
            <Button onClick={handleOpenCreate} variant="outline">
              + Add New Gear
            </Button>
          </div>
        </div>
      ) : (
        /* Gear Grid */
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
                  <Badge variant="outline" className="absolute right-3 top-3">
                    {gear.condition}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-3 p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <Tag className="h-3.5 w-3.5" />
                  <span>{gear.brand}</span>
                  <span>•</span>
                  <span className="text-slate-500">
                    {gear.category?.category_name}
                  </span>
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

                {/* Server Action Form for Delete */}
                <form
                  action={deleteAction}
                  onSubmit={(e) => {
                    if (!confirm("Are you sure you want to delete this listing?")) {
                      e.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="id" value={gear.id} />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    disabled={isDeletePending}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}