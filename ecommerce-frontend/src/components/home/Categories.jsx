import { Cpu, Gamepad2, Laptop, Shirt, ShoppingBag, Watch } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";

const categories = [
  { icon: Cpu, id: 1, image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=900&auto=format&fit=crop", name: "Electronics" },
  { icon: Shirt, id: 2, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=900&auto=format&fit=crop", name: "Fashion" },
  { icon: Laptop, id: 3, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=900&auto=format&fit=crop", name: "Laptops" },
  { icon: Watch, id: 4, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop", name: "Watches" },
  { icon: ShoppingBag, id: 5, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop", name: "Shoes" },
  { icon: Gamepad2, id: 6, image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=900&auto=format&fit=crop", name: "Gaming" },
];

const Categories = () => {
  return (
    <section className="page-shell py-16">
      <SectionHeader
        eyebrow="Categories"
        title="Browse by intent"
        description="Clean category cards that link directly into the product discovery experience."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            className="glass-panel group overflow-hidden rounded-3xl p-3 transition hover:-translate-y-1"
            key={category.id}
            to={`/products?category=${encodeURIComponent(category.name)}`}
          >
            <div className="relative overflow-hidden rounded-[1.35rem]">
              <img
                alt={category.name}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                src={category.image}
              />
              <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-white/75 p-3 backdrop-blur-xl dark:bg-slate-950/65">
                <span className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <category.icon aria-hidden className="size-5" />
                </span>
                <span className="text-lg font-bold text-slate-950 dark:text-white">{category.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
