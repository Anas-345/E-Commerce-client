import { useAuth } from "@/context/AuthContext";

export default function OrderHeader() {
  const { isAdmin } = useAuth();
  return (
    <div className="border-b pb-4">
      <h1 className="text-2xl font-bold tracking-tight">
        {isAdmin ? "Order Management" : "My Orders"}
      </h1>
      <p className="text-sm text-muted-foreground">
        {isAdmin
          ? "View and manage all customer orders, status, and shipping info."
          : "Track and manage your order history."}
      </p>
    </div>
  );
}
