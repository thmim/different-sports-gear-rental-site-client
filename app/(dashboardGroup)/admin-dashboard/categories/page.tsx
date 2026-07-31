"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateCategoryPage() {
  const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // ফর্ম ডেটা স্টেট
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     image: "",
//   });

  // ইনপুট চেঞ্জ হ্যান্ডেলার
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // এরর ক্লিয়ার করুন যখন ইউজার টাইপ করে
//     if (error) setError(null);
//   };

  // ফর্ম সাবমিট
//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
    
//     // বেসিক ভ্যালিডেশন (ক্লায়েন্ট সাইড)
//     if (!formData.name.trim()) {
//       setError("Category name is required");
//       return;
//     }
//     if (!formData.description.trim()) {
//       setError("Description is required");
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       setError(null);

//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to create category");
//       }

//       // সফল হলে রিডাইরেক্ট
//       router.push("/dashboard/categories");
//       router.refresh();
      
//     } catch (err: any) {
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      {/* হেডার */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Category</h1>
        <p className="text-muted-foreground mt-2">
          Add a new gear category for users to list and rent under.
        </p>
      </div>

      {/* ফর্ম */}
      <form className="space-y-6">
        {/* এরর মেসেজ */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Category Name - Required */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Cameras & Lenses"
            // value={formData.name}
            // onChange={handleChange}
            // disabled={isSubmitting}
            className="w-full"
          />
        </div>

        {/* Description - Required */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Brief details about what fits into this category..."
            // value={formData.description}
            // onChange={handleChange}
            // disabled={isSubmitting}
            rows={4}
            className="resize-none w-full"
          />
        </div>

        {/* Image URL - Optional */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Image URL <span className="text-muted-foreground text-sm">(Optional)</span>
          </label>
          <Input
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/category-image.jpg"
            // value={formData.image}
            // onChange={handleChange}
            // disabled={isSubmitting}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter a valid image URL for the category cover image.
          </p>
        </div>

        {/* অ্যাকশন বাটন */}
        <div className="flex items-center gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            // disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" 
        //   disabled={isSubmitting}
           className="flex-1 sm:flex-none">
            {/* {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
}