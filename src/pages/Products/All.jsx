import { useEffect, useState } from "react";
import { PackageX } from "lucide-react";
import { allProducts, deleteProduct } from "@/services/products";
import { toast } from "sonner";
import ProductHeader from "@/components/Product/ProductHeader";
import ProductFilter from "@/components/Product/ProductFilter";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ProductBody from "@/components/Product/ProductBody";
import DialogBox from "@/components/DialogBox";

export default function All() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [deleting, setDeleting] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  async function handleDeleteProduct() {
    setDeleting(true);
    const res = await deleteProduct(deletingProduct);
    setDeletingProduct(null);
    if (!res) {
      setDeleting(false);
      return;
    }
    setDeleting(false);
    toast.success("Item deleted successfully");
    getProducts();
  }

  async function getProducts() {
    const res = await allProducts();
    setProducts(res);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

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
