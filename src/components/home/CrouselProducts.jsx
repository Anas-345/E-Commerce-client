import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export default function CrouselProducts({ products, loading }) {
  function scrollCarousel(direction) {
    const container = document.getElementById("product-carousel");
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Featured Products
          </h2>
          <p className="text-sm text-muted-foreground">
            Handpicked top items trending right now
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full cursor-pointer"
            onClick={() => scrollCarousel("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full cursor-pointer"
            onClick={() => scrollCarousel("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-55">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-10">
          No products available at the moment.
        </p>
      ) : (
        <div
          id="product-carousel"
          className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-2"
        >
          {products.map((product) => (
            <Card
              key={product.id}
              className="min-w-60 shrink-0 overflow-hidden hover:border-primary/50 transition-all duration-200"
            >
              <div className="h-48 w-full bg-muted/30 border-b relative flex items-center justify-center p-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/400x400?text=No+Image";
                  }}
                />
                {product.category && (
                  <Badge
                    variant="secondary"
                    className="absolute top-2 left-2 text-[10px] capitalize bg-background/80 backdrop-blur-sm"
                  >
                    {product.category}
                  </Badge>
                )}
              </div>

              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-primary">
                    ${Number(product.price || 0).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
