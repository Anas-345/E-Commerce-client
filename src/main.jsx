import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import AuthContext from "./context/AuthContext";
import WishlistContext from "./context/useWishlist";
import CartContext from "./context/useCart";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <CartContext>
          <WishlistContext>
            <App />
          </WishlistContext>
        </CartContext>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>,
);
