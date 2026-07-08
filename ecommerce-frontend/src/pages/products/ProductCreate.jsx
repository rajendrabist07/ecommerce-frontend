import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/forms/ProductForm";
import SectionHeader from "../../components/common/SectionHeader";
import Button from "../../components/common/Button";

export default function ProductCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = async (data) => {
    setIsSubmitting(true);
    try {
      // API call to create product
      // await productService.create(data);
      navigate("/admin");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-shell py-10">
      <SectionHeader
        eyebrow="Admin"
        title="Create Product"
        description="Add a new product to your store"
      />

      <div className="mt-8 max-w-2xl rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
        <ProductForm
          onSuccess={handleSuccess}
          onError={(error) => console.error("Error creating product:", error)}
        />
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="mt-4 w-full"
        >
          Cancel
        </Button>
      </div>
    </section>
  );
}
