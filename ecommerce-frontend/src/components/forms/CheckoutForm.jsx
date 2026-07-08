import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import { useState } from "react";

const checkoutSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State/Province is required"),
    zipCode: z.string().min(3, "Zip/Postal code is required"),
    country: z.string().min(2, "Country is required"),
    cardNumber: z.string().regex(/^\d{16}$/, "Valid card number required"),
    cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
    cardCVC: z.string().regex(/^\d{3,4}$/, "Valid CVC required"),
});

export default function CheckoutForm({ onSuccess, onError, total }) {
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
    });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            // Process payment and create order
            onSuccess?.(data);
        } catch (error) {
            const message = error.message || "Checkout failed. Please try again.";
            setServerError(message);
            onError?.(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {serverError && (
                <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                    {serverError}
                </div>
            )}

            <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                    Shipping Address
                </h3>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Full Name
                    </label>
                    <input
                        type="text"
                        {...register("fullName")}
                        placeholder="John Doe"
                        className="input-field"
                    />
                    {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                    )}
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Email
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
                            Phone
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
                </div>

                <div className="mt-4">
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

                <div className="mt-4 grid gap-4 sm:grid-cols-4">
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
                            State
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
                            Zip Code
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
            </div>

            <div>
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                    Payment Information
                </h3>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Card Number
                    </label>
                    <input
                        type="text"
                        {...register("cardNumber")}
                        placeholder="1234 5678 9012 3456"
                        className="input-field"
                        maxLength="16"
                    />
                    {errors.cardNumber && (
                        <p className="mt-1 text-xs text-red-600">{errors.cardNumber.message}</p>
                    )}
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            {...register("cardExpiry")}
                            placeholder="MM/YY"
                            className="input-field"
                            maxLength="5"
                        />
                        {errors.cardExpiry && (
                            <p className="mt-1 text-xs text-red-600">{errors.cardExpiry.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            CVC
                        </label>
                        <input
                            type="text"
                            {...register("cardCVC")}
                            placeholder="123"
                            className="input-field"
                            maxLength="4"
                        />
                        {errors.cardCVC && (
                            <p className="mt-1 text-xs text-red-600">{errors.cardCVC.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900 dark:text-white">
                        Order Total:
                    </span>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        NPR {total?.toFixed(2) || "0.00"}
                    </span>
                </div>
            </div>

            <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full"
            >
                Complete Order
            </Button>
        </form>
    );
}
