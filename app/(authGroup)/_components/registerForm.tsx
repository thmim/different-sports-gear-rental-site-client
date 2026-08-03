"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Camera, ArrowRight } from "lucide-react";
import { registerAction } from "../_action/signUpAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  message: "",
};

export default function RegisterForm() {
const router = useRouter();
  const [state, action, isPending] = useActionState(registerAction, initialState)
  
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);

      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    }
    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state,router]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <Card className="w-full max-w-lg shadow-xl border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Camera className="h-7 w-7 text-indigo-600" />
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              GearUp
            </span>
          </div>
          <CardTitle className="text-xl font-semibold">
            Create your account
          </CardTitle>
          <CardDescription>
            Join the community to rent professional equipment or earn listing your gear.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Alex Morgan"
                required

              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="alex@example.com"
                required

              />
            </div>

           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {state.message && (
              <div
                className={`rounded-md p-3 text-sm font-medium ${
                  state.success
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {state.message}
              </div>
            )}

            <Button type="submit" className="w-full gap-2">
              {isPending ? "Submitting..." : <>Create Account <ArrowRight className="h-4 w-4" /></>}

            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}