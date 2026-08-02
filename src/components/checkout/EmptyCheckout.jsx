import { useNavigate } from "react-router";
import { Card, CardContent } from "../ui/card";
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

export default function EmptyCheckout() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto my-12 text-center">
      <Card className="py-10 border-dashed">
        <CardContent className="space-y-4">
          <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto" />
          <h2 className="text-xl font-bold">Your cart is empty</h2>
          <p className="text-xs text-muted-foreground">
            Add items to your cart before proceeding to checkout.
          </p>
          <Button onClick={() => navigate("/products")}>Browse Catalog</Button>
        </CardContent>
      </Card>
    </div>
  );
}
