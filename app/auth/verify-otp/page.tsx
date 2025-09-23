import { OTPForm } from '@/components/forms/otp-form'

export default function SignUpPage() {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <OTPForm />
            </div>
        </div>
    )
}