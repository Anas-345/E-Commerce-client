import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function AddProductFooter({ loading, id }) {
  const navigate = useNavigate();
  return (
    <CardFooter className="flex justify-end gap-3 border-t pt-4">
      <Button
        type="button"
        className="cursor-pointer"
        variant="outline"
        onClick={() => navigate("/dashboard/products/all")}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={loading} className="gap-2 cursor-pointer">
        <PlusCircle className="h-4 w-4" />
        {loading
          ? !id
            ? "Creating..."
            : "Updating..."
          : !id
            ? "Save Product"
            : "Update Product"}
      </Button>
    </CardFooter>
  );
}
