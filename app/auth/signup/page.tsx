import { SignUpForm } from "@/components/forms/signup-form"
import Link from "next/link"
import Image from "next/image"
import logoLight from '@/public/img/logo-dark.svg'

export default function SignInPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-6 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center">
                            <Image src={logoLight} alt='Sefask Logo' className='p-1' />
                        </div>
                        Sefask
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-lg">
                        <SignUpForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                
            </div>
        </div>
    )
}