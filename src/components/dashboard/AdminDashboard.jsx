import {
  ArrowRight,
  DollarSign,
  Package,
  ShieldCheck,
  ShoppingBag,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router";

export default function AdminDashboard({ adminStats }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          System overview, key statistics, and recent activity metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered user accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminStats.totalCustomers}
            </div>
            <p className="text-xs text-muted-foreground">Active buyers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Admins
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalAdmins}</div>
            <p className="text-xs text-muted-foreground">Admin managers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Catalog items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">Processed sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              ${adminStats.totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Gross earnings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold">
                Recent Orders
              </CardTitle>
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
                  key={order._id}
                  className="flex items-center justify-between text-xs border-b pb-2.5 last:border-0 last:pb-0"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold">
                      {order.fullName || "Guest Customer"}
                    </p>
                    <p className="text-muted-foreground text-[11px] font-mono">
                      {order._id.slice(-8)}
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold">
                Recently Registered Users
              </CardTitle>
              <CardDescription className="text-xs">
                Newest user platform signups
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              onClick={() => navigate("/dashboard/users")}
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {adminStats.recentUsers.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">
                No recent users found.
              </p>
            ) : (
              adminStats.recentUsers.map((u) => (
                <div
                  key={u._id || u.id}
                  className="flex items-center justify-between text-xs border-b pb-2.5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                      {(u.fullName || u.email || "U")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{u.fullName || "N/A"}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {u.email}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={u.role === "admin" ? "default" : "secondary"}
                    className="text-[10px] capitalize"
                  >
                    {u.role || "customer"}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
