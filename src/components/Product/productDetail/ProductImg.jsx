import { Badge } from "@/components/ui/badge";

export default function ProductImg({ product }) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl border bg-muted overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
          }}
        />
        <Badge
          variant="secondary"
          className="absolute top-4 left-4 capitalize backdrop-blur-md bg-background/80"
        >
          {product.category}
        </Badge>
      </div>
    </div>
  );
}
