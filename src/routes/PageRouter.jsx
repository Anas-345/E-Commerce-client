import PublicLayout from "@/components/layouts/PublicLayout";
import Auth from "@/pages/Auth/Auth";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import Wishlist from "@/pages/Wishlist";
import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import PrivateLayout from "@/components/layouts/PrivateLayout";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import Users from "@/pages/Users";
import All from "@/pages/Products/All";
import Add from "@/pages/Products/Add";
import ProductDetails from "@/pages/Products/ProductDetail";
import Checkout from "@/pages/Checkout";
import AdminRoutes from "./AdminRoutes";
import PageNotFound from "@/pages/PageNotFound";

export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<All />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products">
            <Route index element={<Navigate to="all" replace />} />
            <Route path="all" element={<All />} />
            <Route element={<AdminRoutes />}>
              <Route path="add" element={<Add />} />
              <Route path="edit/:id" element={<Add />} />
            </Route>
          </Route>
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Orders />} />
          <Route element={<AdminRoutes />}>
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="cart" element={<Cart />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
