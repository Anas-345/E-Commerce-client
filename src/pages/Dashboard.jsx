import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Heart, ArrowRight } from "lucide-react";
import Loader from "@/components/Loader";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { getDashboardData } from "@/services/dashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const [loading, setLoading] = useState(true);

  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalAdmins: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    recentUsers: [],
  });

  const [customerStats, setCustomerStats] = useState({
    ordersCount: 0,
    wishlistCount: 0,
  });

  async function fetchDashboardData() {
    const res = await getDashboardData();
    if (!res) {
      setLoading(false);
      return;
    }
    if (isAdmin) setAdminStats(res);
    else setCustomerStats(res);
    setLoading(false);
  }
  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loader content={"Loading dashboard overview..."} />;

  if (isAdmin) return <AdminDashboard adminStats={adminStats} />;
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name || "Customer"}!
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your activity, inspect orders, and update personal account
          profile.
        </p>
      </div>

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
