import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { getDashboardData } from "@/services/dashboard";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";

export default function Dashboard() {
  const { isAdmin } = useAuth();

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
  return <CustomerDashboard customerStats={customerStats} />;
}
