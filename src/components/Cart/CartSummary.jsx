import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router";
import { useCart } from "@/context/useCart";

export default function CartSummary() {
  const navigate = useNavigate();
  const { totalItems, totalPrice } = useCart();
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-emerald-600 font-medium">Free</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-bold">
            <span>Total Amount</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="w-full gap-2 h-11"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
