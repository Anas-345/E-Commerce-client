import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/useCart";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
    setMenuOpen(false);
    navigate("/auth/login");
  };

  const navItems = [
    { name: "Home", to: "/", icon: Home, end: true },
    { name: "Products", to: "/products", icon: Package2 },
    ...(!isAdmin
      ? [
          { name: "Wishlist", to: "/dashboard/wishlist", icon: Heart },
          ...(user?.name
            ? [{ name: "My Orders", to: "/dashboard/orders", icon: Package }]
            : []),
        ]
      : []),
    ...(isAdmin
      ? [
          {
            name: "Admin Dashboard",
            to: "/dashboard",
            icon: LayoutDashboard,
            admin: true,
          },
        ]
      : []),
  ];

  const isNavActive = (item) =>
    item.end
      ? location.pathname === item.to
      : location.pathname === item.to ||
        location.pathname.startsWith(`${item.to}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background-base/95 backdrop-blur supports-backdrop-filter:bg-background-base/80 px-4 md:px-8">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2"
          >
            <Store className="h-6 w-6 text-primary" />
            StoreApp
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link
              to="/"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              Products
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!isAdmin && (
            <>
              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-text-secondary hover:text-text-primary hover:bg-white/5"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-glow-primary">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </>
          )}

          {user?.name ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-border bg-card text-text-primary hover:bg-white/5 hover:text-text-primary"
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 border-border bg-popover text-popover-foreground"
              >
                <DropdownMenuLabel className="text-text-tertiary">
                  My Account ({user.role})
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard")}
                  className="focus:bg-white/5 focus:text-text-primary"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/auth/login")}
                className="text-text-secondary hover:text-text-primary hover:bg-white/5 cursor-pointer"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/auth/register")}
                className="bg-primary text-white hover:bg-primary-hover shadow-glow-primary cursor-pointer"
              >
                Register
              </Button>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer text-text-secondary hover:text-text-primary hover:bg-white/5"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-glow-primary">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-border bg-card text-text-primary hover:bg-white/10 cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-80 flex-col justify-between gap-0 border-border bg-background-base p-0 text-text-primary"
            >
              {/* Brand accent strip */}
              <div className="h-1 w-full shrink-0 bg-gradient-primary" />

              {/* Brand header */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-4 pr-12">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-glow-primary">
                  <Store className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold leading-tight tracking-tight text-text-primary">
                    StoreApp
                  </p>
                  <p className="text-[11px] text-text-tertiary">
                    Your premium shopping hub
                  </p>
                </div>
              </div>

              {/* Scrollable middle */}
              <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-5">
                {user?.name && (
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold uppercase text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-text-primary">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-text-tertiary">
                        {user.email || user.role || "Store member"}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "shrink-0 border-primary/30 bg-primary/10 text-primary",
                        isAdmin &&
                          "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
                      )}
                    >
                      {user.role || "Customer"}
                    </Badge>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <p className="mb-1 px-1 text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
                    Menu
                  </p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isNavActive(item);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-150",
                          active
                            ? item.admin
                              ? "bg-accent-amber/15 text-accent-amber"
                              : "bg-primary/15 text-text-primary shadow-glow-primary"
                            : "text-text-secondary hover:bg-white/5 hover:text-text-primary active:translate-y-px",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                            active
                              ? item.admin
                                ? "bg-accent-amber/20 text-accent-amber"
                                : "bg-primary/20 text-primary"
                              : "bg-white/5 text-text-tertiary group-hover:text-text-secondary",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-left">
                          {item.name}
                        </span>
                        {active && (
                          <span
                            className={cn(
                              "h-2 w-2 shrink-0 rounded-full",
                              item.admin ? "bg-accent-amber" : "bg-primary",
                            )}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border px-4 py-4">
                {user?.name ? (
                  <Button
                    variant="destructive"
                    className="h-10 w-full gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" /> Log Out
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <Button
                      variant="outline"
                      className="h-10 w-full gap-2 border-border bg-white/5 text-text-primary hover:bg-white/10"
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/auth/login");
                      }}
                    >
                      <User className="h-4 w-4" /> Log In
                    </Button>
                    <Button
                      className="h-10 w-full gap-2 bg-gradient-primary text-white shadow-glow-primary hover:opacity-90"
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/auth/register");
                      }}
                    >
                      Create Account
                    </Button>
                    <p className="pt-1 text-center text-[11px] text-text-tertiary">
                      New here? Create an account to start shopping.
                    </p>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
