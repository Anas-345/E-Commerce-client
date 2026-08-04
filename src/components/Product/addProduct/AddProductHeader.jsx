import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function AddProductHeader({ id }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate("/dashboard/products/all")}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {!id ? "Add New Product" : "Edit Product"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {!id ? "Create a new" : "Update"} item to display in your store
          catalog.
        </p>
      </div>
    </div>
  );
}
