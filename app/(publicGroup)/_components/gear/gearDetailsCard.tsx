"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tag,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Share2,
  Heart,
  MessageSquare,
  Truck,
  RotateCcw,
} from "lucide-react";
import { getGearDetails } from "../../_actions/getGearDetails";
import { GearItemDetails } from "@/types/gearType";

// Mock data structure matching your backend schema
const MOCK_GEAR_DATA = {
  id: "2b72294f-699c-4acf-9a94-41ef7ba58376",
  provider_id: "42bba18f-573f-45f6-8c7a-cd1accce4da9",
  category_id: "d9206419-8914-470d-b4dd-b8f0b9bf860c",
  name: "Adidas Wind-proof Outdoor Boot",
  product_image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop",
  description:
    "Designed for modern adventurers and field athletes, these boots feature high-durability traction soles, wind-resistant softshell lining, and lightweight shock absorption. Ideal for rugged outdoor terrain, soccer practice, and wet trail hiking.",
  brand: "Adidas",
  is_available: true,
  condition: "FAIR" as const,
  daily_price: "20",
  quantity: 3,
  created_at: "2026-07-11T10:38:41.567Z",
  updated_at: "2026-07-11T10:39:23.866Z",
  category: {
    id: "d9206419-8914-470d-b4dd-b8f0b9bf860c",
    category_name: "Soccer",
    image: null,
    description: "There are lots of soccer gadget here",
    created_at: "2026-07-11T10:33:09.753Z",
    updated_at: "2026-07-11T10:33:09.753Z",
  },
  provider: {
    name: "John Doe Rentals",
    rating: "4.9",
    total_rentals: 42,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
};

const CONDITION_STYLES: Record<string, string> = {
  NEW: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200",
  LIKE_NEW: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200",
  GOOD: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200",
  FAIR: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 border-orange-200",
  POOR: "bg-red-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 border-orange-200",
};
interface GearDetailsProps {
  gearData: GearItemDetails
}

export default function GearDetailsCard({gearData}:GearDetailsProps) {
  const params = useParams();
  const gearId = params.id as string;
  const avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  // Rental state
  const [rentalDays, setRentalDays] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(MOCK_GEAR_DATA.product_image);

  // Fallback gallery images (uses main image + placeholders for demo)
  const galleryImages = [
    MOCK_GEAR_DATA.product_image,
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1000&auto=format&fit=crop",
  ];

  const dailyPriceNum = parseFloat(gearData.daily_price);
  const totalPrice = (dailyPriceNum * rentalDays).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation Bar */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/gears">
              <ArrowLeft className="h-4 w-4" />
              Back to Catalog
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Save Gear">
              <Heart className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Share">
              <Share2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </Button>
          </div>
        </div>

        {/* Main Grid: Left Gallery/Info, Right Booking Sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Left Column (2 Cols wide on Desktop) */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* Image Gallery */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="relative h-96 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <img
                  src={gearData.product_image}
                  alt={gearData.name}
                  className="h-full w-full object-cover transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop";
                  }}
                />
                
                <div className="absolute left-4 top-4 flex gap-2">
                  <Badge className="bg-slate-900/90 text-white backdrop-blur-md">
                    {gearData.category.category_name}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={CONDITION_STYLES[gearData.condition]}
                  >
                    Condition: {gearData.condition}
                  </Badge>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex items-center gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === img
                        ? "border-indigo-600 ring-2 ring-indigo-600/20"
                        : "border-slate-200 hover:border-slate-300 dark:border-slate-800"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Gear Title & Quick Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                <Tag className="h-4 w-4" />
                <span>{gearData.brand}</span>
              </div>

              <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
                {gearData.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  {gearData.is_available && gearData.quantity > 0 ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        In Stock ({gearData.quantity} units available)
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="font-medium text-red-600 dark:text-red-400">
                        Currently Unavailable
                      </span>
                    </>
                  )}
                </div>
                <span>•</span>
                <div>Gear ID: <code className="text-xs">{gearId || gearData.id}</code></div>
              </div>

              <Separator className="my-6" />

              {/* Tabs for Details, Specs, Owner Info */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="owner">Owner Info</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4 space-y-4">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {gearData.description}
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                    <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                      <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-xs font-semibold">Damage Protection</p>
                        <p className="text-[11px] text-slate-500">Covered under GearUp rental guarantee</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                      <Truck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-xs font-semibold">Pickup / Handover</p>
                        <p className="text-[11px] text-slate-500">Available for local pickup or courier</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="mt-4">
                  <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                    <div className="flex justify-between p-3 text-sm">
                      <span className="text-slate-500">Brand</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{gearData.brand}</span>
                    </div>
                    <div className="flex justify-between p-3 text-sm">
                      <span className="text-slate-500">Category</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{gearData.category.category_name}</span>
                    </div>
                    <div className="flex justify-between p-3 text-sm">
                      <span className="text-slate-500">Condition</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{gearData.condition}</span>
                    </div>
                    <div className="flex justify-between p-3 text-sm">
                      <span className="text-slate-500">Available Stock</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{gearData.quantity} items</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="owner" className="mt-4">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border">
                        <AvatarImage src={avatar} alt={gearData.provider.name} />
                        <AvatarFallback>JP</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{gearData.provider.name}</p>
                        {/* <p className="text-xs text-slate-500">⭐ {MOCK_GEAR_DATA.provider.rating} • {MOCK_GEAR_DATA.provider.total_rentals} successful rentals</p> */}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column: Booking Box */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-slate-200 shadow-lg dark:border-slate-800">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                      ${gearData.daily_price}
                    </span>
                    <span className="text-sm font-normal text-slate-500"> / day</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Verified Gear
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Rental Duration Calculator */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Rental Duration (Days)
                  </label>
                  <div className="flex items-center rounded-lg border border-slate-200 p-1 dark:border-slate-800">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                      disabled={rentalDays <= 1}
                    >
                      -
                    </Button>
                    <span className="flex-1 text-center font-bold text-sm">
                      {rentalDays} {rentalDays === 1 ? "Day" : "Days"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRentalDays(rentalDays + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-900">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>${gearData.daily_price} × {rentalDays} days</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Service fee</span>
                    <span>$0.00</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-slate-100">
                    <span>Total Estimate</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <Button
                  className="w-full text-base font-semibold py-6"
                  disabled={!gearData.is_available || gearData.quantity <= 0}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Request Booking
                </Button>

                <p className="text-center text-[11px] text-slate-500">
                  You won&apos;t be charged until the gear owner accepts your request.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}