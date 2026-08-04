import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import PagesHeader from "../PagesHeader";

export default function CustomerDashboard({ customerStats }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <PagesHeader
        header={`!Welcome back, ${user?.name || "Customer"}`}
        content={
          "Manage your activity, inspect orders, and update personal account profile."
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card
          className="cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => navigate("/dashboard/orders")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">
              {customerStats.ordersCount}
            </div>
            <span className="text-xs text-primary flex items-center gap-1 font-medium">
              View My Orders <ArrowRight className="h-3 w-3" />
            </span>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:border-destructive/50 transition-colors"
          onClick={() => navigate("/dashboard/wishlist")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Wishlist Items
            </CardTitle>
            <Heart className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">
              {customerStats.wishlistCount}
            </div>
            <span className="text-xs text-destructive flex items-center gap-1 font-medium">
              View Wishlist <ArrowRight className="h-3 w-3" />
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
