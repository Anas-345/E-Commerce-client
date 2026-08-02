import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { updateOrder } from "@/services/order";

export default function OrderOwnerView({
  orders,
  setSelectedOrder,
  setOrders,
}) {
  async function handleStatusChange(orderId, newStatus) {
    const res = await updateOrder(orderId, newStatus);
    if (!res) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  }
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs font-medium">
                  {order.id.slice(-8)}...
                </TableCell>

                <TableCell>
                  <div className="space-y-0.5">
                    <p className="font-medium text-xs">{order.fullName}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {order.email}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell className="font-semibold text-xs">
                  ${Number(order.totalPrice || 0).toFixed(2)}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {order.status.toLowerCase() === "pending" ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200 gap-1"
                          onClick={() =>
                            handleStatusChange(order.id, "Delivered")
                          }
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Deliver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-destructive hover:bg-destructive/10 border-destructive/20 gap-1"
                          onClick={() =>
                            handleStatusChange(order.id, "Cancelled")
                          }
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground italic pr-2">
                        Locked ({order.status})
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 h-8 text-xs"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
