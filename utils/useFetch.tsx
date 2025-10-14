import React from 'react';

interface SignUpErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

const useFetch = () => {
    const [data, setData] = React.useState(null);
    const [errors, setErrors] = React.useState<SignUpErrors | null >(null);
    const [loading, setLoading] = React.useState(false);

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
                return;
            } else {
                setData(result);
                setErrors(null);
            }
        } catch (err: any) {
            setErrors(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return { data, errors, setErrors, loading, fetchData };
};

export default useFetch;
