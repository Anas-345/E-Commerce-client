import {
  DollarSign,
  Package,
  ShieldCheck,
  ShoppingBag,
  UserCheck,
  Users,
} from "lucide-react";
import PagesHeader from "../PagesHeader";
import PagesCards from "../PagesCards";
import RecentOrders from "./RecentOrders";
import RecentUsers from "./RecentUsers";

export default function AdminDashboard({ adminStats }) {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      <PagesHeader
        header={"Admin Dashboard"}
        content={
          "System overview, key statistics, and recent activity metrics."
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            header: "Total Users",
            icon: <Users className="h-4 w-4 text-primary" />,
            count: adminStats.totalUsers,
            content: "Registered user accounts",
          },
          {
            header: "Total Customers",
            icon: <UserCheck className="h-4 w-4 text-emerald-600" />,
            count: adminStats.totalCustomers,
            content: "Active buyers",
          },
          {
            header: "Total Admins",
            icon: <ShieldCheck className="h-4 w-4 text-blue-600" />,
            count: adminStats.totalAdmins,
            content: "Admin managers",
          },
          {
            header: "Total Products",
            icon: <Package className="h-4 w-4 text-amber-600" />,
            count: adminStats.totalProducts,
            content: "Catalog items",
          },
          {
            header: "Total Orders",
            icon: <ShoppingBag className="h-4 w-4 text-indigo-600" />,
            count: adminStats.totalOrders,
            content: "Processed sales",
          },
          {
            header: "Total Revenue",
            icon: <DollarSign className="h-4 w-4 text-emerald-600" />,
            count: `$${adminStats.totalRevenue.toFixed(2)}`,
            content: "Gross earnings",
          },
        ].map((c, i) => (
          <PagesCards
            key={i}
            header={c.header}
            icon={c.icon}
            count={c.count}
            content={c.content}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders adminStats={adminStats} />

        <RecentUsers adminStats={adminStats} />
      </div>
    </div>
  );
}
