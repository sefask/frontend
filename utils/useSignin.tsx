"use client"
import { useState } from "react";
import useFetch from "./useFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SignInFormData {
    email: string;
    password: string;
}


export const useSignIn = () => {
    const [formData, setFormData] = useState<SignInFormData>({
        email: "",
        password: "",
    });

    const navigator = useRouter()
    const { errors, data, setErrors, loading, fetchData } = useFetch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const signIn = await fetchData("/api/auth/signin", { method: "POST", body: JSON.stringify(formData) });

        if (signIn) {
            toast.success("Successfully signed in!");
            if(!signIn?.user.isVerified) {
                navigator.push("/auth/verify-otp");
            } else {
                navigator.push("/user/dashboard");
            }
        }
    }

    return { formData, setFormData, errors, setErrors, loading, handleSubmit };
}