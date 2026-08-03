

"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // or your toast library
import { GearCategory, GearItem } from "@/types/gearType";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ActionState, upsertGearAction } from "../_actions/getProviderOwnGear";

interface CreateGearModalProps {
  initialData?: GearItem | null;
  categories?: GearCategory[] | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

const initialState: ActionState = {
  success: false,
  message: "",
};

export default function CreateGearModal({
  initialData,
  categories,
  isOpen,
  onOpenChange,
  onSuccess,
}: CreateGearModalProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    upsertGearAction,
    initialState
  );

  const isEditMode = Boolean(initialData?.id);
  // Prevent toast from firing multiple times
  const lastMessageRef = useRef<string | null>(null);
  // Handle success / error
  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message, {
        duration: 3000, // 3 seconds
      });

      onOpenChange?.(false);
      onSuccess?.();
      
    } else {
      toast.error(state.message, {
        duration: 4000,
      });
    }
  }, [state, router, onSuccess, onOpenChange]);

  

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Gear Listing" : "Create Gear Listing"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update your rental item details."
              : "Add new equipment to your rental inventory."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 py-2">
          {initialData?.id && (
            <input type="hidden" name="id" value={initialData.id} />
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Gear Name *</label>
              <input
                type="text"
                name="name"
                defaultValue={initialData?.name || ""}
                required
                className="w-full rounded-md border p-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Brand *</label>
              <input
                type="text"
                name="brand"
                defaultValue={initialData?.brand || ""}
                required
                className="w-full rounded-md border p-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label htmlFor="category" className="text-xs font-semibold">
                Category Name *
              </label>
              <select
                id="category"
                name="category_name"
                defaultValue={initialData?.category?.category_name || ""}
                className="w-full rounded-md border p-2 text-sm bg-background"
                required
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Daily Price ($) *</label>
              <input
                type="number"
                name="daily_price"
                step="0.01"
                defaultValue={initialData?.daily_price || ""}
                required
                className="w-full rounded-md border p-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Quantity *</label>
              <input
                type="number"
                name="quantity"
                defaultValue={initialData?.quantity ?? 1}
                required
                className="w-full rounded-md border p-2 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Condition *</label>
            <select
              name="condition"
              defaultValue={initialData?.condition || "NEW"}
              className="w-full rounded-md border p-2 text-sm bg-background"
            >
              <option value="NEW">New</option>
              <option value="LIKE_NEW">Like New</option>
              <option value="GOOD">Good</option>
              <option value="FAIR">Fair</option>
              <option value="POOR">Poor</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Product Image URL</label>
           
            <input
              type="url"
              name="product_image"
              defaultValue={initialData?.product_image || ""}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-md border p-2 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Description</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={initialData?.description || ""}
              className="w-full rounded-md border p-2 text-sm"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Gear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}