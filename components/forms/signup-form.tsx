"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useSignUp } from "@/utils/useSignup"
import { Spinner } from "../ui/spinner"

export function SignUpForm({ className, ...props }: React.ComponentProps<"form">) {
  const { formData, setFormData, loading, errors, setErrors, handleSubmit } = useSignUp();
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-start gap-2 text-start">
        <h1 className="text-2xl font-bold">Welcome to Sefask</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Please provide the following information to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="grid gap-3">
            <div className="flex justify-between">
              <Label htmlFor="first-name">First name</Label>
              <p className="text-amber-300 text-xs">{errors?.firstName}</p>
            </div>
            <Input
              id="first-name"
              formNoValidate
              onChange={(e) => { setErrors({ ...errors, firstName: "" }); setFormData({ ...formData, firstName: e.target.value }) }}
              type="text" placeholder="John"
              className={`${errors?.firstName ? "border-amber-400/35" : ""}`}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex justify-between">
              <Label htmlFor="last-name">Last name(s)</Label>
              <p className="text-amber-400 text-xs">{errors?.lastName}</p>
            </div>
            <Input id="last-name" formNoValidate type="text" placeholder="Doe"
              onChange={(e) => { setErrors({ ...errors, lastName: "" }); setFormData({ ...formData, lastName: e.target.value }) }}
              className={`${errors?.lastName ? "border-amber-400/35" : ""}`}
            />
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="email">Email</Label>
            <p className="text-amber-400 text-xs">{errors?.email}</p>
          </div>
          <Input id="email" type="email" formNoValidate placeholder="m@example.com"
            onChange={(e) => { setErrors({ ...errors, email: "" }); setFormData({ ...formData, email: e.target.value }) }}
            className={`${errors?.email ? "border-amber-400/35" : ""}`}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <p className="text-amber-300 text-xs">{errors?.password}</p>
          </div>
          <Input id="password" type="password" placeholder="•••••••••••"
            onChange={(e) => { setErrors({ ...errors, password: "" }); setFormData({ ...formData, password: e.target.value }) }}
            className={`${errors?.password ? "border-amber-400/35" : ""}`}
          />
        </div>
        <Button type="submit" size={"lg"} className="w-full cursor-pointer">
          {loading ? <Spinner /> : <span>Sign up</span>}
        </Button>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking sign up, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signin" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  )
}
