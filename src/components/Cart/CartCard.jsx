import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useCart } from "@/context/useCart";

export default function CartCard({ item }) {
  const { handleDecrement, handleIncrement, handleRemove } = useCart();
  const pId = item.id;
  const itemSubtotal = item.price * item.quantity;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-20 w-20 rounded-lg object-cover bg-muted shrink-0"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/200x200?text=No+Image";
          }}
        />

        <div className="flex-1 text-center sm:text-left space-y-1">
          <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
          <p className="text-xs text-muted-foreground">
            Unit Price: ${Number(item.price || 0).toFixed(2)}
          </p>
          <p className="text-xs font-medium text-emerald-600">
            Subtotal: ${itemSubtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg p-0.5 bg-muted/30">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleDecrement(pId)}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-8 text-center text-xs font-semibold">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleIncrement(pId, item.stock)}
              disabled={item.quantity >= item.stock}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive h-8 w-8"
            onClick={() => handleRemove(pId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
