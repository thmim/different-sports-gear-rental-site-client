import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-slate-200 shadow-sm text-center p-6 sm:p-8">
        <CardContent className="space-y-6 pt-2">
          {/* Icon Badge */}
          <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <FileQuestion className="w-8 h-8" />
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              404 Error
            </span>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Page Not Found
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sorry, we couldn’t find the page you’re looking for. It might have
              been moved, deleted, or never existed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button variant="outline" asChild className="w-full sm:w-auto text-xs">
              <Link href="javascript:history.back()" className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5" />
                Go Back
              </Link>
            </Button>

            <Button asChild className="w-full sm:w-auto text-xs">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Home className="w-3.5 h-3.5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}