import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Valid email is required"),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
});

export default function ProfileForm({ onSuccess, onError }) {
    const { user } = useAuth();
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || "",
            city: user?.city || "",
            state: user?.state || "",
            zipCode: user?.zipCode || "",
            country: user?.country || "",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                city: user.city || "",
                state: user.state || "",
                zipCode: user.zipCode || "",
                country: user.country || "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        setServerError("");
        setSuccessMessage("");
        try {
            // API call would happen here
            // await updateProfile(data)
            setSuccessMessage("Profile updated successfully!");
            onSuccess?.(data);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            const message = error.message || "Failed to update profile";
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

            {successMessage && (
                <div className="rounded-lg bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                    {successMessage}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Phone Number
                </label>
                <input
                    type="tel"
                    {...register("phone")}
                    placeholder="+1 (555) 000-0000"
                    className="input-field"
                />
                {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Address
                </label>
                <input
                    type="text"
                    {...register("address")}
                    placeholder="123 Main Street"
                    className="input-field"
                />
                {errors.address && (
                    <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        City
                    </label>
                    <input
                        type="text"
                        {...register("city")}
                        placeholder="New York"
                        className="input-field"
                    />
                    {errors.city && (
                        <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        State/Province
                    </label>
                    <input
                        type="text"
                        {...register("state")}
                        placeholder="NY"
                        className="input-field"
                    />
                    {errors.state && (
                        <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Zip/Postal Code
                    </label>
                    <input
                        type="text"
                        {...register("zipCode")}
                        placeholder="10001"
                        className="input-field"
                    />
                    {errors.zipCode && (
                        <p className="mt-1 text-xs text-red-600">{errors.zipCode.message}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Country
                    </label>
                    <input
                        type="text"
                        {...register("country")}
                        placeholder="United States"
                        className="input-field"
                    />
                    {errors.country && (
                        <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full"
            >
                Save Changes
            </Button>
        </form>
    );
}
