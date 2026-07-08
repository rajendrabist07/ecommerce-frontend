export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const getProductImage = (product) =>
  product?.image ||
  product?.thumbnail ||
  product?.images?.[0]?.url ||
  product?.images?.[0] ||
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop";

export const getProductId = (product) => product?._id || product?.id || product?.slug;

export const cx = (...classes) => classes.filter(Boolean).join(" ");
