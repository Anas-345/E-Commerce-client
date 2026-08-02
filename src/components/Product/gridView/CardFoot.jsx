import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/useCart";
import { Eye, Minus, Pencil, Plus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";

export default function CardFoot({ product }) {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { handleAddToCart, handleDecrement, handleIncrement, cartItems } =
    useCart();

  const prod = cartItems.find((p) => p.id === product.id);
  const qty = prod?.quantity || 0;
  return (
    <CardFooter className="p-4 pt-0 flex gap-2">
      {isAdmin ? (
        <>
          <Button
            variant="outline"
            className="flex-1 gap-2 text-xs"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Eye className="h-3.5 w-3.5" /> View
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2 text-xs"
            onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        </>
      ) : qty > 0 ? (
        <div className="flex items-center justify-between w-full border rounded-lg p-1 bg-muted/30">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => handleDecrement(product.id)}
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="font-semibold text-sm px-2">{qty}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => handleIncrement(product.id, product.stock)}
            disabled={qty >= product.stock}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <Button
          className="w-full gap-2"
          disabled={product.stock === 0}
          onClick={() => handleAddToCart(product)}
        >
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </Button>
      )}
    </CardFooter>
  );
}
