import PublicLayout from "@/components/layouts/PublicLayout";
import Auth from "@/pages/Auth/Auth";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import { Route, Routes } from "react-router";

export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}
