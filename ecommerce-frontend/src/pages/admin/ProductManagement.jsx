import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import Button from "../../components/common/Button";
import ProductForm from "../../components/forms/ProductForm";
import SectionHeader from "../../components/common/SectionHeader";

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            // API call would happen here
            // const data = await productService.getAll();
            // setProducts(data);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                // await productService.delete(id);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    const handleSave = async (data) => {
        try {
            if (editingId) {
                // await productService.update(editingId, data);
                setProducts(products.map(p => p._id === editingId ? { ...p, ...data } : p));
            } else {
                // const newProduct = await productService.create(data);
                // setProducts([...products, newProduct]);
            }
            setShowForm(false);
            setEditingId(null);
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

    return (
        <section className="page-shell py-10">
            <div className="mb-8 flex items-center justify-between">
                <SectionHeader
                    eyebrow="Manage"
                    title="Products"
                    description="Create, update, and delete products"
                />
                <Button icon={Plus} onClick={() => setShowForm(true)}>
                    Add Product
                </Button>
            </div>

            {showForm && (
                <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                    <h3 className="mb-4 text-lg font-bold">
                        {editingId ? "Edit Product" : "Create New Product"}
                    </h3>
                    <ProductForm
                        onSuccess={handleSave}
                        onError={(error) => console.error(error)}
                        initialData={editingId ? products.find(p => p._id === editingId) : undefined}
                    />
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowForm(false);
                            setEditingId(null);
                        }}
                        className="mt-4"
                    >
                        Cancel
                    </Button>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                    No products yet. Create your first product!
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                        NPR {product.price}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                        {product.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => {
                                                setEditingId(product._id);
                                                setShowForm(true);
                                            }}
                                            className="mr-3 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
