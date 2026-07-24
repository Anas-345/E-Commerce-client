import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
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
  ShoppingCart,
  Heart,
  User,
  Menu,
  LogOut,
  LayoutDashboard,
  Package,
  Store,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const cartItemCount = 3;
  const isAdmin = user?.role === "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
    navigate("/auth/login");
  };

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
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="text-accent-amber font-semibold flex items-center gap-1 hover:underline"
              >
                <LayoutDashboard className="w-4 h-4" /> Admin Portal
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!isAdmin && (
            <>
              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-text-secondary hover:text-text-primary hover:bg-white/5"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-text-secondary hover:text-text-primary hover:bg-white/5"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-glow-primary">
                      {cartItemCount}
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
                {isAdmin ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/dashboard")}
                      className="focus:bg-white/5 focus:text-text-primary"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/products")}
                      className="focus:bg-white/5 focus:text-text-primary"
                    >
                      <Package className="mr-2 h-4 w-4" /> Manage Products
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard")}
                      className="focus:bg-white/5 focus:text-text-primary"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/orders")}
                      className="focus:bg-white/5 focus:text-text-primary"
                    >
                      <Package className="mr-2 h-4 w-4" /> My Orders
                    </DropdownMenuItem>
                  </>
                )}
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
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-glow-primary">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-border bg-card text-text-primary hover:bg-white/5 cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 flex flex-col justify-between border-border bg-background-base text-text-primary"
            >
              <div className="flex flex-col gap-4 mt-6">
                <Link to="/" className="text-lg font-medium text-text-primary">
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-lg font-medium text-text-primary"
                >
                  Products
                </Link>
                <Link
                  to="/wishlist"
                  className="text-lg font-medium text-text-primary"
                >
                  Wishlist
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="text-lg font-semibold text-accent-amber"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {!isAdmin && user && (
                  <Link
                    to="/orders"
                    className="text-lg font-medium text-text-primary"
                  >
                    My Orders
                  </Link>
                )}
              </div>
              <div className="border-t border-border pt-4">
                {user ? (
                  <Button
                    variant="destructive"
                    className="w-full bg-destructive text-white hover:bg-destructive/90"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/login")}
                      className="border-border text-text-primary hover:bg-white/5"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => navigate("/register")}
                      className="bg-primary text-white hover:bg-primary-hover"
                    >
                      Register
                    </Button>
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
