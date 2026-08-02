import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/useCart";
import { useWishlist } from "@/context/useWishlist";
import {
  Eye,
  Heart,
  Minus,
  Pencil,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function TableActions({ product, setDeletingProduct }) {
  const navigate = useNavigate();
  const { handleAddToCart, handleDecrement, handleIncrement, cartItems } =
    useCart();
  const { isAdmin } = useAuth();
  const { handleToggle, isLiked } = useWishlist();
  const like = isLiked(product.id);
  const prod = cartItems.find((p) => p.id === product.id);
  const qty = prod?.quantity || 0;
  return (
    <TableCell className="text-right">
      <div className="flex justify-end items-center gap-1.5">
        {!isAdmin && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleToggle(product.id)}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                like
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:text-red-500"
              }`}
            />
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          title="View Details"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <Eye className="h-4 w-4" />
        </Button>

        {isAdmin ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => setDeletingProduct(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        ) : qty > 0 ? (
          <div className="flex items-center gap-1 border rounded-lg p-0.5 bg-muted/40">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleDecrement(product.id)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-semibold text-xs px-1">{qty}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleIncrement(product.id, product.stock)}
              disabled={qty >= product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            disabled={product.stock === 0}
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingBag className="h-3.5 w-3.5 mr-1.5" /> Add
          </Button>
        )}
      </div>
    </TableCell>
  );
}
