import { useState } from "react";
import { toast } from "sonner";

export default function useCart() {
  const [cartItems, setCartItems] = useState({});
  function handleAddToCart(productId) {
    setCartItems((prev) => ({
      ...prev,
      [productId]: 1,
    }));
    toast.success("Added to cart");
  }

  function handleIncrement(productId, maxStock) {
    setCartItems((prev) => {
      const currentQty = prev[productId] || 0;
      if (currentQty >= maxStock) {
        toast.error(`Only ${maxStock} items available in stock`);
        return prev;
      }
      return { ...prev, [productId]: currentQty + 1 };
    });
  }

  function handleDecrement(productId) {
    setCartItems((prev) => {
      const currentQty = prev[productId] || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[productId];
        toast.info("Removed from cart");
        return updated;
      }
      return { ...prev, [productId]: currentQty - 1 };
    });
  }

  return {
    cartItems,
    handleAddToCart,
    handleDecrement,
    handleIncrement,
  };
}
