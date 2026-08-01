"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface GearFormData {
  id?: string;
  name: string;
  brand: string;
  category_id: string;
  daily_price: string;
  quantity: string;
  condition: "NEW" | "EXCELLENT" | "GOOD" | "FAIR";
  product_image: string;
  description: string;
}

interface CreateGearModalProps {
  initialData?: GearFormData | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const CATEGORIES = [
  { id: "d9206419-8914-470d-b4dd-b8f0b9bf860c", name: "Soccer" },
  { id: "c1016419-8914-470d-b4dd-b8f0b9bf860a", name: "Photography & Video" },
  { id: "a3026419-8914-470d-b4dd-b8f0b9bf860b", name: "Camping & Hiking" },
  { id: "b4036419-8914-470d-b4dd-b8f0b9bf860c", name: "Water Sports" },
];

export default function CreateGearModal({
  initialData,
  isOpen,
  onOpenChange,
  onSuccess,
  trigger,
}: CreateGearModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const activeOpen = isOpen !== undefined ? isOpen : open;
  const setActiveOpen = onOpenChange || setOpen;

  const [formData, setFormData] = useState<GearFormData>({
    name: "",
    brand: "",
    category_id: "",
    daily_price: "",
    quantity: "1",
    condition: "GOOD",
    product_image: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        brand: "",
        category_id: "",
        daily_price: "",
        quantity: "1",
        condition: "GOOD",
        product_image: "",
        description: "",
      });
    }
  }, [initialData, activeOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Simple manual validation checks
    if (!formData.name.trim()) {
      setErrorMessage("Please enter a gear name.");
      return;
    }
    if (!formData.brand.trim()) {
      setErrorMessage("Please enter a brand.");
      return;
    }
    if (!formData.category_id) {
      setErrorMessage("Please select a category.");
      return;
    }
    if (!formData.daily_price || Number(formData.daily_price) <= 0) {
      setErrorMessage("Please enter a valid daily price greater than 0.");
      return;
    }
    if (!formData.quantity || Number(formData.quantity) < 1) {
      setErrorMessage("Quantity must be at least 1.");
      return;
    }

    try {
      setLoading(true);

      const endpoint = initialData?.id
        ? `/api/gear/${initialData.id}`
        : "/api/gear";
      const method = initialData?.id ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save gear.");
      }

      setActiveOpen(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={activeOpen} onOpenChange={setActiveOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {!trigger && isOpen === undefined && (
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Gear
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {initialData?.id ? "Edit Gear Details" : "Create New Gear Listing"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {errorMessage && (
            <div className="rounded-md bg-red-50 p-3 text-xs font-medium text-red-600 dark:bg-red-950/50 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Gear Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Gear Title *
            </label>
            <Input
              name="name"
              placeholder="e.g. Sony Alpha A7 III Camera"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Brand *
              </label>
              <Input
                name="brand"
                placeholder="e.g. Sony"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Category *
              </label>
              <Select
                value={formData.category_id}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, category_id: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Daily Price, Quantity & Condition */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Daily Price ($) *
              </label>
              <Input
                name="daily_price"
                type="number"
                min="1"
                step="0.01"
                placeholder="25.00"
                value={formData.daily_price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Quantity *
              </label>
              <Input
                name="quantity"
                type="number"
                min="1"
                placeholder="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Condition
              </label>
              <Select
                value={formData.condition}
                onValueChange={(val: any) =>
                  setFormData((prev) => ({ ...prev, condition: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="EXCELLENT">Excellent</SelectItem>
                  <SelectItem value="GOOD">Good</SelectItem>
                  <SelectItem value="FAIR">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Product Image URL
            </label>
            <Input
              name="product_image"
              placeholder="https://images.unsplash.com/..."
              value={formData.product_image}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Description
            </label>
            <Textarea
              name="description"
              placeholder="Provide key specs, accessories included, and usage guidelines..."
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData?.id ? "Update Gear" : "Publish Listing"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}