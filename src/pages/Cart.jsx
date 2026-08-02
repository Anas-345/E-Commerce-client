import { useCart } from "@/context/useCart";
import EmptyCart from "@/components/Cart/EmptyCart";
import CartSummary from "@/components/Cart/CartSummary";
import CartCard from "@/components/Cart/CartCard";

export default function Cart() {
  const { cartItems, totalItems } = useCart();

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-sm text-muted-foreground">
          You have {totalItems} item(s) in your cart.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}
