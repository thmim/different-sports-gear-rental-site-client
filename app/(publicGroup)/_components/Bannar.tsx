import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Search,
  ShieldCheck,
  Sparkles,
  Camera,
  Compass,
  CreditCard,
  Star,
} from "lucide-react";

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-slate-100 py-16 lg:py-24 border-b border-slate-800">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Premier Outdoor & Tech Rental Marketplace</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Rent Quality Gear <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                For Any Adventure.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Connect with verified providers to rent top-tier camera gear, camping equipment, and outdoor electronics at a fraction of the retail cost.
            </p>

            {/* Quick Search Box */}
            <div className="pt-2">
              <form
                action="/gear"
                className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-xl bg-slate-800/90 border border-slate-700 shadow-xl max-w-xl mx-auto lg:mx-0"
              >
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    name="query"
                    placeholder="Search cameras, tents, drones..."
                    className="pl-9 bg-slate-900/60 border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:ring-emerald-500 h-10"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-medium h-10 px-6"
                >
                  Explore Gear
                </Button>
              </form>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-400" />
                <span>Secure SSL Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Easy Pickup & Returns</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Feature Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Featured Gear Card Preview */}
            <Card className="w-full max-w-sm bg-slate-800/80 border-slate-700 shadow-2xl backdrop-blur overflow-hidden relative z-10">
              <div className="h-48 bg-slate-700/50 relative flex items-center justify-center">
                <Camera className="w-16 h-16 text-slate-500/50" />
                <Badge className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  Popular
                </Badge>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-100 text-base">
                      Sony FX3 Cinema Camera
                    </h3>
                    <p className="text-xs text-slate-400">4K Full-Frame Cinema Line</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-400">$65</span>
                    <span className="text-xs text-slate-400">/day</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-400 pt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-semibold text-slate-200">4.9</span>
                  <span className="text-slate-400">(28 reviews)</span>
                </div>

                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Available instantly</span>
                  <Button size="sm" variant="outline" asChild className="text-xs border-slate-600 text-slate-200 hover:bg-slate-700">
                    <Link href="/gear">View Details</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Background Floating Decorative Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-2 w-64 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 shadow-lg backdrop-blur-sm z-0 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Gear Protection Included</span>
              </div>
              <p className="text-slate-400 leading-normal">
                Rent with peace of mind. Every order includes basic damage coverage.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}