import { useState } from "react";
import { HeartOff } from "lucide-react";
import ProductFilter from "@/components/Product/ProductFilter";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ProductBody from "@/components/Product/ProductBody";
import { useWishlist } from "@/context/useWishlist";
import WishlistHeader from "@/components/wishlist/WishlistHeader";
import useProducts from "@/hooks/useProducts";

export default function Wishlist() {
  const [viewMode, setViewMode] = useState("grid");
  const { wishlist, loading: wishlistLoading } = useWishlist();

  const { products, loading: ProductsLoading } = useProducts();

  const wishlistProds = products.filter((prod) => wishlist.includes(prod.id));

  if (ProductsLoading) return <Loader content={" Fetching products..."} />;

  return (
    <div className="space-y-6">
      <WishlistHeader />

      <ProductFilter viewMode={viewMode} setViewMode={setViewMode} />

      {wishlistLoading ? (
        <Loader content={"Fetching wishlist items..."} />
      ) : wishlistProds.length === 0 ? (
        <EmptyState Icon={HeartOff} content={"wishlist"} />
      ) : (
        <ProductBody viewMode={viewMode} products={wishlistProds} />
      )}
    </div>
  );
}
