import { allProducts, deleteProduct } from "@/services/products";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return {
    loading, products, deleting, handleDeleteProduct, setDeletingProduct, deletingProduct
  }
}
