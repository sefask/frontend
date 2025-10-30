import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useFetch from "./useFetch";

export const useSignout = () => {
    const navigator = useRouter()
    const { errors, data, setErrors, loading, fetchData } = useFetch();

    const handleSignout = async (e: React.FormEvent) => {
        e.preventDefault();
        const signOut = await fetchData("/api/auth/signout", { method: "POST" });

        if (signOut) {
            toast.success("Successfully signed out!");
            navigator.refresh();
        }
    }

    return { errors, setErrors, loading, handleSignout };
}