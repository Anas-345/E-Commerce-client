import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutSummary({ submitting }) {
  const { user } = useAuth();
  const { cartItems, totalPrice } = useCart();
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {cartItems.map((item) => {
            const pId = item.id || item._id;
            return (
              <div
                key={pId}
                className="flex justify-between items-center text-sm"
              >
                <div className="space-y-0.5 max-w-45">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} × ${Number(item.price).toFixed(2)}
                  </p>
                </div>
                <span className="font-semibold text-xs">
                  ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
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
          type="submit"
          form="checkout-form"
          className="w-full h-11 text-base font-medium"
          disabled={!user?.name || submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Placing Order...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" /> Place Order
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
