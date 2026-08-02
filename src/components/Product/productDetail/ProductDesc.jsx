import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/useCart";
import { useWishlist } from "@/context/useWishlist";
import {
  Heart,
  Minus,
  PackageCheck,
  PackageX,
  Plus,
  ShoppingBag,
} from "lucide-react";

export default function ProductDesc({ product }) {
  const { isAdmin } = useAuth();
  const { handleAddToCart, handleDecrement, handleIncrement, cartItems } =
    useCart();

  const { handleToggle, isLiked } = useWishlist();
  const like = isLiked(product.id);
  const prod = cartItems.find((p) => p.id === product.id);
  const qty = prod?.quantity || 0;
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold tracking-tight">
            ${Number(product.price || 0).toFixed(2)}
          </span>
        </div>

        {product.stock > 0 ? (
          <Badge
            variant="outline"
            className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 py-1 px-3"
          >
            <PackageCheck className="h-3.5 w-3.5 mr-1.5" /> In Stock (
            {product.stock})
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-destructive border-destructive/20 bg-destructive/10 py-1 px-3"
          >
            <PackageX className="h-3.5 w-3.5 mr-1.5" /> Out of Stock
          </Badge>
        )}
      </div>

      <Separator />

      {!isAdmin && (
        <div className="flex items-center gap-3">
          {qty > 0 ? (
            <div className="flex items-center justify-between border rounded-lg p-1 bg-muted/30 flex-1 h-11">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => {
                  handleDecrement(product.id);
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-base px-4">{qty}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => {
                  handleIncrement(product.id, product.stock);
                }}
                disabled={qty >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              className="flex-1 gap-2 h-11 text-base font-medium"
              disabled={product.stock === 0}
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingBag className="h-5 w-5" /> Add to Cart
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0"
            onClick={() => handleToggle(product.id)}
          >
            <Heart
              className={`h-5 w-5 ${like ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
