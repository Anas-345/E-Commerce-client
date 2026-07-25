import { Link, NavLink, useLocation } from "react-router";
import {
  ShoppingBag,
  Heart,
  Package,
  LogOut,
  Store,
  LayoutDashboard,
  Users,
  Package2,
  ChevronDown,
  Plus,
  List,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: Package2,
      subItems: [
        {
          name: "All Products",
          path: "/dashboard/products/all",
          icon: List,
        },
        ...(isAdmin
          ? [
              {
                name: "Add Product",
                path: "/dashboard/products/add",
                icon: Plus,
              },
            ]
          : []),
      ],
    },
    ...(!isAdmin
      ? [
          { name: "My Cart", path: "/dashboard/cart", icon: ShoppingBag },
          { name: "Wishlist", path: "/dashboard/wishlist", icon: Heart },
        ]
      : []),
    { name: "Orders", path: "/dashboard/orders", icon: Package },
    ...(isAdmin
      ? [{ name: "Users", path: "/dashboard/users", icon: Users }]
      : []),
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Store className="h-5 w-5 text-primary" />
          <span>My Store</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.subItems) {
              const isSubActive = location.pathname.startsWith(item.path);

              return (
                <Collapsible
                  key={item.name}
                  defaultOpen={isSubActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <SidebarMenuSubItem key={sub.path}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={sub.path}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                                      : ""
                                  }
                                >
                                  <SubIcon className="h-3.5 w-3.5" />
                                  <span>{sub.name}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.path}
                    end={item.path === "/dashboard"} // exact match for main dashboard
                    className={({ isActive }) =>
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                        : ""
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border space-y-3">
        <div className="px-2">
          <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email}
          </p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 px-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
