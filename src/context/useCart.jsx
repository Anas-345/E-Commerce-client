import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Cart = createContext();

export default function CartContext({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  );

  function handleAddToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success("Added to cart");
  }

  function handleIncrement(productId, maxStock) {
    setCartItems((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          if (p.quantity >= maxStock) {
            toast.error(`Only ${maxStock} items available in stock`);
            return p;
          }
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      }),
    );
  }

  function handleDecrement(productId) {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
        )
        .filter((p) => p.quantity > 0),
    );
  }

  function handleRemove(id) {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  }

  function clearCart() {
    setCartItems([])
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalItems = cartItems.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, p) => sum + p.quantity * p.price,
    0,
  );
  return (
    <Cart.Provider
      value={{
        handleAddToCart,
        handleDecrement,
        handleIncrement,
        cartItems,
        totalItems,
        totalPrice,
        handleRemove,
        clearCart,
      }}
    >
      {children}
    </Cart.Provider>
  );
}

export const useCart = () => useContext(Cart);
