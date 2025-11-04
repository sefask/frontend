import { SignInForm } from '@/components/forms/signin-form'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('authToken')

    if (token) {
        redirect('/dashboard');
    }

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignInForm />
            </div>
        </div>
    )
}