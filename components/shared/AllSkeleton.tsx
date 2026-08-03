import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SkeletonLoaderProps {
  variant?: "table" | "card" | "form" | "details" | "generic";
  rows?: number;
}

export default function SkeletonLoader({
  variant = "table",
  rows = 5,
}: SkeletonLoaderProps) {
  // 1. Table Variant (For Admin/Provider/Customer Order Tables)
  if (variant === "table") {
    return (
      <Card className="border-slate-200 shadow-sm w-full">
        <CardHeader className="px-6 py-5 border-b border-slate-100 flex flex-row items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 space-y-4">
            {/* Table Header Row */}
            <div className="flex gap-4 pb-2 border-b">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 py-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-8 w-1/4 rounded-md" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // 2. Card Grid Variant (For Gear listings, catalog pages)
  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {Array.from({ length: rows }).map((_, index) => (
          <Card key={index} className="overflow-hidden border-slate-200 shadow-sm">
            <Skeleton className="h-48 w-full rounded-none" />
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // 3. Form Variant (For booking forms, create gear modal/page)
  if (variant === "form") {
    return (
      <Card className="p-6 space-y-6 border-slate-200 shadow-sm w-full">
        <Skeleton className="h-7 w-1/3" />
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </Card>
    );
  }

  // 4. Details Variant (For Order Details or Gear Details pages)
  if (variant === "details") {
    return (
      <div className="space-y-6 w-full max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Card className="p-6 space-y-6 border-slate-200">
          <Skeleton className="h-6 w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
          <Skeleton className="h-32 w-full rounded-lg" />
        </Card>
      </div>
    );
  }

  // 5. Default Generic Block Fallback
  return (
    <div className="space-y-4 w-full p-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
  );
}