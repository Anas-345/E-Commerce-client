import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/useCart";
import EmptyCheckout from "@/components/checkout/EmptyCheckout";
import LoginForm from "@/components/checkout/LoginForm";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PagesHeader from "@/components/PagesHeader";

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems } = useCart();

  const [submitting, setSubmitting] = useState(false);

  if (cartItems.length === 0) return <EmptyCheckout />;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <PagesHeader
        header={"Checkout"}
        content={"Complete your order details below."}
      />

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
