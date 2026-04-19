import { createBrowserRouter } from "react-router"

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

export const router = createBrowserRouter([{
  path: "/",
  element: <Home />
}, {
  path: "/products/:id",
  element: <ProductDetail />,
}])
