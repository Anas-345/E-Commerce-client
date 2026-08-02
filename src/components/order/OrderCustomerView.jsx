import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export default function OrderCustomerView({ order, getStatusBadgeVariant }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30 pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
          <div className="space-y-0.5">
            <span className="text-xs text-muted-foreground">Order ID</span>
            <p className="font-mono font-medium text-xs">{order.id}</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <Badge
              variant="outline"
              className={`capitalize py-0.5 px-2.5 font-medium ${getStatusBadgeVariant(
                order.status,
              )}`}
            >
              {order.status || "Pending"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="space-y-3">
          {order.items?.map((item) => (
            <div key={item._id || item.id} className="flex items-center gap-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-14 w-14 rounded-md object-cover bg-muted shrink-0"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/100x100?text=No+Image";
                }}
              />
              <div className="flex-1 space-y-0.5">
                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                </p>
              </div>
              <span className="text-sm font-semibold">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex justify-between items-center text-sm font-semibold pt-1">
          <span className="text-muted-foreground">Total Paid</span>
          <span className="text-base font-bold text-primary">
            ${Number(order.totalPrice || 0).toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
