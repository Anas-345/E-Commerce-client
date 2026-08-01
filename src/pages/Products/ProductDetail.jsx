import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { singleProduct } from "@/services/products";
import Loader from "@/components/Loader";
import EmptyProduct from "@/components/Product/productDetail/EmptyProduct";
import ProductImg from "@/components/Product/productDetail/ProductImg";
import ProductDesc from "@/components/Product/productDetail/ProductDesc";
import ProductOverview from "@/components/Product/productDetail/ProductOverview";
import ProductActions from "@/components/Product/productDetail/ProductActions";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(0);

  async function fetchProduct() {
    setLoading(true);
    const data = await singleProduct(id);
    setProduct(data);
    setLoading(false);
  }

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader content={"Loading product details..."} />;
  }

  if (!product) {
    return <EmptyProduct />;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <ProductActions />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ProductImg product={product} />
        <ProductDesc
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <ProductOverview product={product} />
    </div>
  );
}
