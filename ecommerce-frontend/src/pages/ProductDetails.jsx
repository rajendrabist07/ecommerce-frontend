import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import ProductCard from "../components/common/ProductCard";
import { ErrorState, SkeletonGrid } from "../components/common/StatusState";
import { useCart } from "../context/CartContext";
import { getProducts, getSingleProduct, normalizeProducts } from "../services/productService";
import { formatCurrency, getProductId, getProductImage } from "../utils/formatters";

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const productData = await getSingleProduct(id);
        setProduct(productData);

        const relatedData = await getProducts({ category: productData?.category?.name || productData?.category });
        setRelated(
          normalizeProducts(relatedData)
            .filter((item) => getProductId(item) !== getProductId(productData))
            .slice(0, 4),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="page-shell py-10">
        <SkeletonGrid count={2} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-shell py-10">
        <ErrorState message={error} />
      </section>
    );
  }

  if (!product) return null;

  const images = [getProductImage(product), ...(product.images || []).map((image) => image.url || image)].slice(0, 4);

  return (
    <section className="page-shell py-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr]">
        <motion.div className="glass-panel rounded-[2rem] p-3" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
          <img alt={product.name} className="aspect-square w-full rounded-[1.5rem] object-cover" src={images[0]} />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <img alt={`${product.name} ${index + 1}`} className="aspect-square rounded-2xl object-cover" key={`${image}-${index}`} src={image} />
            ))}
          </div>
        </motion.div>

        <motion.div className="self-center" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
          <Link className="text-sm font-bold text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white" to="/products">
            Back to products
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
              {product.category?.name || product.category || "Lifestyle"}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-300">
              <Star aria-hidden className="size-4 fill-current" />
              {Number(product.rating || product.averageRating || 4.8).toFixed(1)}
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {product.description || "Premium product with modern design, dependable quality, and fast checkout support."}
          </p>
          <p className="mt-6 text-4xl font-black text-slate-950 dark:text-white">{formatCurrency(product.price)}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="glass-panel flex w-fit items-center rounded-2xl p-1">
              <button className="icon-button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button">
                <Minus aria-hidden className="size-4" />
              </button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button className="icon-button" onClick={() => setQuantity((value) => value + 1)} type="button">
                <Plus aria-hidden className="size-4" />
              </button>
            </div>
            <Button icon={ShoppingBag} onClick={() => addItem(product, quantity)}>
              Add to cart
            </Button>
            <Button icon={Heart} variant="secondary">
              Wishlist
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="glass-panel rounded-3xl p-4">
              <Truck aria-hidden className="mb-3 size-5 text-slate-500" />
              <p className="font-bold">Fast delivery</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Optimized checkout and order flow.</p>
            </div>
            <div className="glass-panel rounded-3xl p-4">
              <ShieldCheck aria-hidden className="mb-3 size-5 text-slate-500" />
              <p className="font-bold">Secure purchase</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">JWT-ready protected customer actions.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {related.length > 0 ? (
        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-slate-950 dark:text-white">Related products</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={getProductId(item)} product={item} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ProductDetails;
