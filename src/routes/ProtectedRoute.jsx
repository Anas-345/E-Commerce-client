import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { user } = useAuth();
  return user?.name ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
