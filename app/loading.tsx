import SkeletonLoader from "@/components/shared/AllSkeleton";

export default function LoadingPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SkeletonLoader variant="table" rows={5} />
    </div>
  );
}