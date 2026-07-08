import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm({ onSuccess, onError }) {
    const { signIn } = useAuth();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            await signIn(data);
            onSuccess?.();
        } catch (error) {
            const message = error.message || "Login failed. Please check your credentials.";
            setServerError(message);
            onError?.(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
                <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                    {serverError}
                </div>
            )}

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Email Address
                </label>
                <input
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="input-field"
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Password
                </label>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className="input-field"
                />
                {errors.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
            </div>

            <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full"
            >
                Sign In
            </Button>
        </form>
    );
}
