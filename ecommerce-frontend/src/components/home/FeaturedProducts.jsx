import { useEffect, useState } from "react";
import ProductCard from "../common/ProductCard";
import { getProducts, normalizeProducts } from "../../services/productService";
import SectionHeader from "../common/SectionHeader";
import { ErrorState, SkeletonGrid } from "../common/StatusState";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({ limit: 8 });
        setProducts(normalizeProducts(response).slice(0, 8));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="page-shell py-16">
      <SectionHeader
        eyebrow="Featured"
        title="Curated picks"
        description="Products presented with fast loading states, subtle motion, and reusable card architecture."
      />

      {loading ? <SkeletonGrid count={4} /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  );

};

export default FeaturedProducts;
