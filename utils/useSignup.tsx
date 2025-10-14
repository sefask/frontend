import { useState } from "react";
import useFetch from "./useFetch";

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
    const { data, errors, setErrors, loading, fetchData } = useFetch();
    // const [errors, setErrors] = useState<SignUpErrors>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData("/api/auth/signup", { method: "POST", body: JSON.stringify(formData) });

        if (!errors) {
            console.log("Signup successful", data);
        }
    }

    return { formData, setFormData, errors, setErrors, loading, handleSubmit };
}