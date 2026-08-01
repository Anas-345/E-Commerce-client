import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProductHeader() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">
          {isAdmin
            ? "Manage your product catalog, prices, and inventory stock."
            : "Browse our latest products and exclusive deals."}
        </p>
      </div>

      {isAdmin && (
        <Button
          onClick={() => navigate("/dashboard/products/add")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> Add New Product
        </Button>
      )}
    </div>
  );
}
