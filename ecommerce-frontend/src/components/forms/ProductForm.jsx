import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import { useState } from "react";

const productSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price must be greater than 0"),
    quantity: z.number().min(0, "Quantity cannot be negative"),
    category: z.string().min(1, "Please select a category"),
    image: z.string().url("Please provide a valid image URL"),
});

export default function ProductForm({ onSuccess, onError, initialData }) {
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            category: "",
            image: "",
        },
    });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            // API call would happen here
            onSuccess?.(data);
        } catch (error) {
            const message = error.message || "Failed to save product";
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
                    Product Name
                </label>
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter product name"
                    className="input-field"
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Description
                </label>
                <textarea
                    {...register("description")}
                    placeholder="Enter product description"
                    rows="4"
                    className="input-field"
                />
                {errors.description && (
                    <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Price
                    </label>
                    <input
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                        placeholder="0.00"
                        step="0.01"
                        className="input-field"
                    />
                    {errors.price && (
                        <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Quantity
                    </label>
                    <input
                        type="number"
                        {...register("quantity", { valueAsNumber: true })}
                        placeholder="0"
                        className="input-field"
                    />
                    {errors.quantity && (
                        <p className="mt-1 text-xs text-red-600">{errors.quantity.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Category
                </label>
                <select {...register("category")} className="input-field">
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    <option value="home">Home</option>
                </select>
                {errors.category && (
                    <p className="mt-1 text-xs text-red-600">{errors.category.message}</p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Image URL
                </label>
                <input
                    type="url"
                    {...register("image")}
                    placeholder="https://example.com/image.jpg"
                    className="input-field"
                />
                {errors.image && (
                    <p className="mt-1 text-xs text-red-600">{errors.image.message}</p>
                )}
            </div>

            <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full"
            >
                Save Product
            </Button>
        </form>
    );
}
