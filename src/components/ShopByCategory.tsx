import { Link } from "react-router-dom";
import catSection from "@/assets/cat-section.jpg";
import catClub from "@/assets/cat-club.jpg";
import catBatch from "@/assets/cat-batch.jpg";

const categories = [
  { label: "Section", image: catSection, href: "/jerseys?cat=Section" },
  { label: "Club", image: catClub, href: "/jerseys?cat=Club" },
  { label: "Batch", image: catBatch, href: "/jerseys?cat=Batch+Jersey" },
];

const ShopByCategory = () => (
  <section className="bg-background py-16">
    <div className="container">
      <h2 className="mb-10 text-center text-2xl font-extrabold uppercase tracking-widest text-foreground md:text-3xl">
        Shop by Category
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            to={cat.href}
            className="group relative overflow-hidden rounded-lg aspect-[3/4]"
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-xl font-extrabold uppercase tracking-wider text-foreground">
                {cat.label}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ShopByCategory;
