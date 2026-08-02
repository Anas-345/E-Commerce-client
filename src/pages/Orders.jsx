import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";
import EmptyOrder from "@/components/order/EmptyOrder";
import { allOrders } from "@/services/order";
import OrderHeader from "@/components/order/OrderHeader";
import OrderOwnerView from "@/components/order/OrderOwnerView";
import OrderCustomerView from "@/components/order/OrderCustomerView";
import OrderDetails from "@/components/order/OrderDetails";

export default function Orders() {
  const { user, isAdmin } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-200 dark:bg-slate-800";
    }
  };

  async function fetchOrders() {
    const res = await allOrders();
    setOrders(res);
    setLoading(false);
  }

  useEffect(() => {
    if (user) fetchOrders();
  }, []);

  if (loading)
    return (
      <Loader
        content={
          isAdmin ? "Loading catalog orders..." : "Loading your orders..."
        }
      />
    );

  if (orders.length === 0) return <EmptyOrder />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <OrderHeader />

      {isAdmin ? (
        <OrderOwnerView orders={orders} setSelectedOrder={setSelectedOrder} setOrders={setOrders} />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {orders.map((order) => (
            <OrderCustomerView
            key={order.id}
              order={order}
              getStatusBadgeVariant={getStatusBadgeVariant}
            />
          ))}
        </div>
      )}

      {isAdmin && (
        <OrderDetails
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          getStatusBadgeVariant={getStatusBadgeVariant}
        />
      )}
    </div>
  );
}
