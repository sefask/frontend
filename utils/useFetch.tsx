import React from 'react';
import { OtpErrors } from './useOTP';

interface SignUpErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
}

const useFetch = () => {
    const [data, setData] = React.useState<any>(null);
    const [errors, setErrors] = React.useState<SignUpErrors & OtpErrors | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetchData = async (url: string, options: RequestInit = {}) => {
        setLoading(true);
        try {
            const defaultOptions: RequestInit = {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            };

            const response = await fetch(url, defaultOptions);
            const result = await response.json();
            if (!response.ok) {
                setErrors(result.errors);
                setData(null);
                return false;
            } else {
                setData(result);
                setErrors(null);
                return true;
            }
        } catch (err: any) {
            setErrors(err.message);
            setData(null);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { data, errors, setErrors, loading, fetchData };
};

export default useFetch;
