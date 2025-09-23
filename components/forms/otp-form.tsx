"use client"
import { useState, useRef } from "react"

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import email from "@/public/img/email.png"
import Link from "next/link"
import Image from "next/image"

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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join("")

    if (otpString.length === 6) {
      // Add your OTP verification logic here
      // TODO: Replace with actual API call
    } else {
      // Handle incomplete OTP
      // TODO: Show user feedback for incomplete OTP
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
            <h1 className="text-xl font-bold">Email verification</h1>
            <div className="text-center text-sm">
              Please enter the OTP sent to
              <p className="font-bold underline underline-offset-4">example@email.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="otp">OTP</Label>
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
                    required
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Button size={"lg"} type="submit" className="w-full">
                Verify OTP
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
