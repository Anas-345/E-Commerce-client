import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import PagesHeader from "../PagesHeader";

export default function WishlistHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
      <PagesHeader
        border=""
        header={"Wishlist"}
        content={"Browse and manage your saved items for future purchases."}
      />

      <Button
        onClick={() => navigate("/dashboard/products/all")}
        className="gap-2"
      >
        <ShoppingBag className="h-4 w-4" /> Browse Products
      </Button>
    </div>
  );
}
