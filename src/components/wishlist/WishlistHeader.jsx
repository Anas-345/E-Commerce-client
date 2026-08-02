import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

export default function WishlistHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Wishlist</h1>
        <p className="text-sm text-muted-foreground">
          Browse and manage your saved items for future purchases.
        </p>
      </div>

      <Button onClick={() => navigate("/dashboard/products/all")} className="gap-2">
        <ShoppingBag className="h-4 w-4" /> Browse Products
      </Button>
    </div>
  );
}
