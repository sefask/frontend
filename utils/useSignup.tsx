import { useState } from "react";
import useFetch from "./useFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Form data interface
interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Error interfaces based on backend user model
interface SignUpErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

interface SignInErrors {
    email?: string;
    password?: string;
}

interface VerifyEmailErrors {
    email?: string;
    code?: string;
}

interface ResendVerificationErrors {
    email?: string;
}

// Export all error interfaces for use in other components
export type {
    SignUpFormData,
    SignUpErrors,
    SignInErrors,
    VerifyEmailErrors,
    ResendVerificationErrors
};

export const useSignUp = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const navigator = useRouter()
    const { errors, setErrors, loading, data, fetchData } = useFetch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const signUp = await fetchData("/api/auth/signup", { method: "POST", body: JSON.stringify(formData) });

        if (signUp) {
            toast.success("Successfully signed up!");
            if (!signUp?.user.isVerified) {
                navigator.push("/auth/verify-otp");
            } else {
                navigator.push("/dashboard");
            }
        }
    }

    return { formData, setFormData, errors, setErrors, loading, handleSubmit };
}