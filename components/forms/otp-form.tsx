"use client"
import { useState, useRef, useEffect } from "react"

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import email from "@/public/img/email.png"
import Link from "next/link"
import Image from "next/image"
import useFetch from "@/utils/useFetch"
import { useOTP } from "@/utils/useOTP"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"

export function OTPForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [otp, setOTP] = useState<string[]>(new Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Handle input change
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return

    const newOTP = [...otp]
    newOTP[index] = element.value
    setOTP(newOTP)

    // Move to next input if current field is filled
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOTP = [...otp]

      if (otp[index]) {
        // If current input has value, clear it
        newOTP[index] = ""
        setOTP(newOTP)
      } else if (index > 0) {
        // If current input is empty, move to previous and clear it
        newOTP[index - 1] = ""
        setOTP(newOTP)
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text").slice(0, 6)

    if (!/^\d+$/.test(pasteData)) return // Only allow numbers

    const newOTP = [...otp]

    for (let i = 0; i < pasteData.length && i < 6; i++) {
      newOTP[i] = pasteData[i]
    }

    setOTP(newOTP)

    // Focus on the next empty input or the last input
    const nextEmptyIndex = newOTP.findIndex(value => value === "")
    const targetIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5)
    inputRefs.current[targetIndex]?.focus()
  }

  const { loading: emailLoading, data, fetchData } = useFetch();

  useEffect(() => {
    const fetchUser = async () => {
      fetchData('/api/auth/me')
    }

    fetchUser();
  }, [fetchData])

  // Handle form submission
  const otpString = otp.join("")
  const { errors, loading, handleSubmit } = useOTP(data?.email, otpString);

  const resendOtp = async () => {
    const resend = await fetchData("/api/auth/resend-verification", { method: "POST", body: JSON.stringify({ email: data?.email }) });

    if (resend) {
      toast.success("OTP resent successfully!");
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-48 grayscale-80 items-center justify-center rounded-md">
                <Image src={email} alt="Email" height={email.height} width={email.width} />
              </div>
              <span className="sr-only">Sefask</span>
            </Link>
            <h1 className="text-xl font-bold">Please verify your email</h1>
            <div className="text-center text-sm">
              Please enter the OTP sent to
              <p className="font-bold underline underline-offset-4">{data?.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="otp" className="sr-only">OTP</Label>
              <p className="text-amber-300 text-xs">{errors?.code}</p>
              <div className="grid grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="text-center"
                    formNoValidate
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Button type="submit" size={"lg"} className="w-full cursor-pointer">
                {loading ? <Spinner /> : <span>Verify OTP</span>}
              </Button>
              <Button type="button" variant={"link"} className="p-0" onClick={resendOtp}>
                {emailLoading ? <div className="flex gap-2 items-center"><Spinner /> <span className="text-white/70">Resending OTP...</span></div> : <span>Resend OTP</span>}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
