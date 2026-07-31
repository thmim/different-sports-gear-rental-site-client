"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCategoryDataAction } from "../../_actions/getCategoryFormData";

export default function CreateCategoryPage() {
  const router = useRouter();
  
  const [state, formAction, isPending] = useActionState(
    getCategoryDataAction,
    {
      success: false,
      message: "",
      errors: {},
    }
  );

  // সাফল্য বা এরর মেসেজ দেখান
  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
        // সাফল্যের পর রিডাইরেক্ট
        // setTimeout(() => {
        //   router.push("/dashboard/categories");
        //   router.refresh();
        // }, 1000);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Category</h1>
        <p className="text-muted-foreground mt-2">
          Add a new gear category for users to list and rent under.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {/* Category Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full border rounded px-3 py-2 ${
              state?.errors?.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g. Cameras & Lenses"
            disabled={isPending}
            // defaultValue={state?.data?.category_name || ""}
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className={`w-full border rounded px-3 py-2 resize-none ${
              state?.errors?.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Brief details about what fits into this category..."
            disabled={isPending}
            // defaultValue={state?.data?.description || ""}
          />
          {state?.errors?.description && (
            <p className="text-red-500 text-sm mt-1">{state.errors.description}</p>
          )}
        </div>

        {/* Image URL - Optional */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Image URL <span className="text-gray-500 text-sm">(Optional)</span>
          </label>
          <input
            type="url"
            id="image"
            name="image"
            className={`w-full border rounded px-3 py-2 ${
              state?.errors?.image ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="https://example.com/category-image.jpg"
            disabled={isPending}
            // defaultValue={state?.data?.image || ""}
          />
          {state?.errors?.image && (
            <p className="text-red-500 text-sm mt-1">{state.errors.image}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Enter a valid image URL for the category cover image.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded hover:bg-gray-50"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}