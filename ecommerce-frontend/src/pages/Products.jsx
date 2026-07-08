import { useCallback, useEffect, useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import SectionHeader from "../components/common/SectionHeader";
import { EmptyState, ErrorState, SkeletonGrid } from "../components/common/StatusState";
import { getProducts, normalizeProducts } from "../services/productService";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("featured");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getProducts({ category: category === "All" ? undefined : category, search: query });
      setProducts(normalizeProducts(response));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, query]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchProducts();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchProducts]);

  useEffect(() => {
    const params = {};
    if (query) params.search = query;
    if (category !== "All") params.category = category;
    setSearchParams(params, { replace: true });
  }, [category, query, setSearchParams]);

  const categories = ["All", ...new Set(products.map((product) => product.category?.name || product.category).filter(Boolean))];
  const filteredProducts = products
    .filter((product) => {
      const text = `${product.name || ""} ${product.description || ""}`.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      const productCategory = product.category?.name || product.category;
      const matchesCategory = category === "All" || productCategory === category;

      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "price-low") return Number(a.price || 0) - Number(b.price || 0);
      if (sort === "price-high") return Number(b.price || 0) - Number(a.price || 0);
      if (sort === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);

      return 0;
    });

  return (
    <section className="page-shell py-10">
      <SectionHeader
        eyebrow="Catalog"
        title="All products"
        description="Search, filter, and sort products through a dedicated service layer backed by your existing API."
      />

      <div className="glass-panel mb-8 grid gap-4 rounded-3xl p-4 lg:grid-cols-[1fr_220px_220px_auto]">
        <label className="relative">
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            className="input-field pl-12"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            value={query}
          />
        </label>
        <select className="input-field" onChange={(event) => setCategory(event.target.value)} value={category}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className="input-field" onChange={(event) => setSort(event.target.value)} value={sort}>
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
        <button className="icon-button bg-white/50 dark:bg-white/5" onClick={fetchProducts} type="button">
          <SlidersHorizontal aria-hidden className="size-5" />
        </button>
      </div>

      {loading ? <SkeletonGrid /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={fetchProducts} /> : null}
      {!loading && !error && filteredProducts.length === 0 ? (
        <EmptyState description="Try another search term or category." title="No products found" />
      ) : null}
      {!loading && !error && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  );

};

export default Products;
