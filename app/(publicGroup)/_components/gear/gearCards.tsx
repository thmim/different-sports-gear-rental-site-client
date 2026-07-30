"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GearItem } from "@/types/gearType";
import { ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GearCardProps {
  gear: GearItem;
}
export default function GearCardPage({ gear }: GearCardProps) {
  // Convert string daily_price to float for display
  const price = parseFloat(gear.daily_price).toFixed(2);

  return (
    <Card className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      
      {/* Product Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={gear.product_image}
          alt={gear.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback for broken/dummy image URLs
            e.currentTarget.src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop";
          }}
        />

        {/* Category & Availability Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge className="bg-slate-900/80 text-white backdrop-blur-md dark:bg-slate-100 dark:text-slate-900">
            {gear.category.category_name}
          </Badge>
          <Badge variant="outline" className="">
            {gear.condition}
          </Badge>
        </div>

        {/* Stock / Availability Status */}
        <div className="absolute right-3 top-3">
          {gear.is_available && gear.quantity > 0 ? (
            <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
              Available ({gear.quantity})
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
          <Tag className="h-3.5 w-3.5" />
          <span>{gear.brand}</span>
        </div>

        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 dark:text-slate-100">
          {gear.name}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
          {gear.description}
        </p>

        {/* Pricing Info */}
        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              ${price}
            </span>
            <span className="text-xs text-slate-500">/ day</span>
          </div>
        </div>
      </CardContent>

      {/* Card Footer Action */}
      <CardFooter className="border-t border-slate-100 p-4 dark:border-slate-800">
        <Button asChild className="w-full gap-2">
          <Link href={`/gear/${gear.id}`}>
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}