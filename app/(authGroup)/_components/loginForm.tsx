
"use client"
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_action/authAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [state,action,isPending] = useActionState(loginAction,false)
console.log(state,"ssss")
  useEffect(()=>{
     if(!state) return;

        // if(state.success){
        //     toast.success(state.message || "Login Successful");
            
        // }
        // router.push("/dashboard") redirect another page
  
        if(!state.success){
            toast.error(state.message || "Login failed");
        }
  },[state]);

  return (

    <form action={action} className="space-y-4">

      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <a
              href="/register"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Sign Up
            </a>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {isPending ? "Submitting..." : "Login"}
          
          </Button>
         {/* later i want to add a google button here  */}
        </CardFooter>
      </Card>
    </form>
  );
}