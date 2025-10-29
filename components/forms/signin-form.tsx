"use client"
import Image from "next/image"
import logoLight from '@/public/img/logo-light.svg'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from "next/link"
import { useSignIn } from "@/utils/useSignin"
import { Spinner } from "../ui/spinner"

export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
  const { formData, setFormData, loading, errors, setErrors, handleSubmit } = useSignIn();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-12 items-center justify-center rounded-md">
                <Image src={logoLight} alt='Sefask Logo' className='p-1' />

              </div>
              <span className="sr-only">Sefask</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Sefask.</h1>
            <div className="text-center text-sm">
              Already got an account?{" "}
              <Link href="/auth/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <div className="flex justify-between">
                <Label htmlFor="email">Email</Label>
                <p className="text-amber-300 text-xs">{errors?.email}</p>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                formNoValidate
                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: "" }) }}
              />
            </div>
            <div className="grid gap-3">
              <div className="flex justify-between">
                <Label htmlFor="email">Password</Label>
                <p className="text-amber-300 text-xs">{errors?.password}</p>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="•••••••••••"
                formNoValidate
                onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setErrors({ ...errors, password: "" }) }}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <Button type="submit" size={"lg"} className="w-full cursor-pointer">
                {loading ? <Spinner /> : <span>Sign in</span>}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking sign in, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
