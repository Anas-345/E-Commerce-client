import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function AdminRoutes() {
  const { isAdmin } = useAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
