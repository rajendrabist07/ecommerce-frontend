import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency, getProductId, getProductImage } from "../../utils/formatters";
import Button from "./Button";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const productId = getProductId(product);
  const rating = product.rating || product.averageRating || 4.8;

  return (
    <motion.article
      className="glass-panel group overflow-hidden rounded-3xl p-3"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link className="block overflow-hidden rounded-[1.35rem]" to={`/products/${productId}`}>
        <img
          alt={product.name || "Product image"}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={getProductImage(product)}
        />
      </Link>

      <div className="p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
            {product.category?.name || product.category || "Lifestyle"}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-300">
            <Star aria-hidden className="size-4 fill-current" />
            {Number(rating).toFixed(1)}
          </span>
        </div>

        <Link to={`/products/${productId}`}>
          <h3 className="line-clamp-2 min-h-12 text-lg font-bold text-slate-950 transition group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-200">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">
          {product.description || "Premium quality product selected for modern everyday shopping."}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xl font-black text-slate-950 dark:text-white">{formatCurrency(product.price)}</p>
          <div className="flex gap-2">
            <button aria-label="Add to wishlist" className="icon-button bg-white/50 dark:bg-white/5" type="button">
              <Heart aria-hidden className="size-5" />
            </button>
            <Button
              aria-label="Add to cart"
              className="size-11 rounded-2xl px-0"
              icon={ShoppingBag}
              onClick={() => addItem(product)}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );

};

export default ProductCard;
