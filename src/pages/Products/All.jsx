import { useState } from "react";
import { PackageX } from "lucide-react";
import ProductHeader from "@/components/Product/ProductHeader";
import ProductFilter from "@/components/Product/ProductFilter";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ProductBody from "@/components/Product/ProductBody";
import DialogBox from "@/components/DialogBox";
import useProducts from "@/hooks/useProducts";

export default function All() {
  const [viewMode, setViewMode] = useState("grid");

  const {
    loading,
    products,
    deleting,
    handleDeleteProduct,
    deletingProduct,
    setDeletingProduct,
  } = useProducts();

  return (
    <div className="space-y-6">
      <ProductHeader />

      <ProductFilter viewMode={viewMode} setViewMode={setViewMode} />

      {loading ? (
        <Loader content={" Fetching products..."} />
      ) : products.length === 0 ? (
        <EmptyState Icon={PackageX} content={"products"} />
      ) : (
        <ProductBody
          viewMode={viewMode}
          products={products}
          setDeletingProduct={setDeletingProduct}
        />
      )}

      <DialogBox
        content={
          "Are you sure you want to delete this product? This action cannot be undone."
        }
        header={"Delete Product?"}
        state={deletingProduct}
        setState={setDeletingProduct}
        handler={handleDeleteProduct}
        btnContent={"Delete Product"}
        loader={deleting}
      />
    </div>
  );
}
