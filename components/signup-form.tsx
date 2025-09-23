import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-start gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome to Sefask</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Please provide the following information to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-3">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" type="text" placeholder="John" required />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="last-name">Last name(s)</Label>
            <Input id="last-name" type="text" placeholder="Doe" required />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" placeholder="•••••••••••" required />
        </div>
        <Button type="submit" size={"lg"} className="w-full cursor-pointer">
          Sign up
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
