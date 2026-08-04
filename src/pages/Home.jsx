import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import useProducts from "@/hooks/useProducts";
import HeroSection from "@/components/home/HeroSection";
import CrouselProducts from "@/components/home/CrouselProducts";

export default function Home() {
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  return (
    <div className="space-y-16 pb-16">
      <HeroSection />

      <CrouselProducts products={products} loading={loading} />

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Shop by Category
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore our wide range of categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Electronics",
              count: products.filter(
                (p) => p.category.toLowerCase() === "electronics",
              ).length,
            },
            {
              name: "Clothing",
              count: products.filter(
                (p) => p.category.toLowerCase() === "clothing",
              ).length,
            },
            {
              name: "Home & Kitchen",
              count: products.filter((p) => p.category.toLowerCase() === "home")
                .length,
            },
            {
              name: "Beauty & Care",
              count: products.filter(
                (p) => p.category.toLowerCase() === "beauty",
              ).length,
            },
          ].map((cat, i) => (
            <Card
              key={i}
              className="cursor-pointer hover:border-primary/50 transition-colors bg-card"
              onClick={() => navigate("/products")}
            >
              <CardContent className="p-6 space-y-1">
                <h3 className="font-bold text-base">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
