import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default function RegisterForm({ onSuccess, onError }) {
    const { signUp } = useAuth();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            const { confirmPassword, ...payload } = data;
            await signUp(payload);
            onSuccess?.();
        } catch (error) {
            const message = error.message || "Registration failed. Please try again.";
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
                    Full Name
                </label>
                <input
                    type="text"
                    {...register("name")}
                    placeholder="John Doe"
                    className="input-field"
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
            </div>

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

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Confirm Password
                </label>
                <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="••••••••"
                    className="input-field"
                />
                {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
            </div>

            <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full"
            >
                Create Account
            </Button>
        </form>
    );
}
