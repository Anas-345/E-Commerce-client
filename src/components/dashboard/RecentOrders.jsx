import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router";

export default function RecentOrders({adminStats}) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-bold">Recent Orders</CardTitle>
          <CardDescription className="text-xs">
            Latest customer transactions
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs gap-1"
          onClick={() => navigate("/dashboard/orders")}
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {adminStats.recentOrders.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            No recent orders found.
          </p>
        ) : (
          adminStats.recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between text-xs border-b pb-2.5 last:border-0 last:pb-0"
            >
              <div className="space-y-0.5">
                <p className="font-semibold">
                  {order.fullName || "Guest Customer"}
                </p>
                <p className="text-muted-foreground text-[11px] font-mono">
                  {order.id.slice(-8)}
                </p>
              </div>
              <div className="text-right space-y-0.5">
                <p className="font-bold">
                  ${Number(order.totalPrice || 0).toFixed(2)}
                </p>
                <Badge
                  variant="outline"
                  className="text-[10px] capitalize px-1.5 py-0"
                >
                  {order.status || "Pending"}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
