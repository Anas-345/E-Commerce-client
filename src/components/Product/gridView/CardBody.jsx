import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";

export default function CardBody({ product }) {
  return (
    <CardContent className="p-4 pt-0 flex-1 space-y-2">
      <p className="text-xs text-muted-foreground line-clamp-2">
        {product.description}
      </p>
      <div className="flex items-center justify-between pt-2">
        <span className="text-lg font-bold">
          ${Number(product.price || 0).toFixed(2)}
        </span>
        {product.stock > 0 ? (
          <Badge
            variant="outline"
            className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30"
          >
            In Stock ({product.stock})
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-destructive border-destructive/20 bg-destructive/10"
          >
            Out of Stock
          </Badge>
        )}
      </div>
    </CardContent>
  );
}
