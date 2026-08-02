import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/useCart";
import EmptyCheckout from "@/components/checkout/EmptyCheckout";
import LoginForm from "@/components/checkout/LoginForm";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems } = useCart();

  const [submitting, setSubmitting] = useState(false);

  if (cartItems.length === 0) return <EmptyCheckout />;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
        <p className="text-sm text-muted-foreground">
          Complete your order details below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {!user?.name && <LoginForm />}

          <Card
            className={
              !user?.name ? "opacity-60 pointer-events-none select-none" : ""
            }
          >
            <CheckoutForm setSubmitting={setSubmitting} />
          </Card>
        </div>

        <CheckoutSummary submitting={submitting} />
      </div>
    </div>
  );
}
