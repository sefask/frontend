"use client"
import useFetch from "./useFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface OtpErrors {
    code?: string;
}

export const useOTP = (email?: string, code?: string) => {

    const navigator = useRouter()
    const { errors, setErrors, loading, fetchData } = useFetch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const verify = await fetchData("/api/auth/verify-email", { method: "POST", body: JSON.stringify({ email, code }) });

        if (verify) {
            toast.success("Successfully verified email!");
            navigator.push("/dashboard");
        }
    }

    return { errors, setErrors, loading, handleSubmit };
}