import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import { Badge } from "../ui/badge";
import {
  ArrowRight,
  LayoutDashboard,
  PlusCircle,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";

export default function HeroSection() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-background border p-8 md:p-16">
      <div className="max-w-2xl space-y-6">
        {isAdmin ? (
          <Badge
            variant="default"
            className="gap-1.5 px-3 py-1 text-xs bg-primary text-primary-foreground"
          >
            <ShieldAlert className="h-3.5 w-3.5" /> Store Owner Control Center
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> New Arrivals
            Season 2026
          </Badge>
        )}

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          {isAdmin
            ? "Welcome Back, Store Owner!"
            : "Discover Quality Products for Your Everyday Life"}
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          {isAdmin
            ? "Manage your catalog, update store inventory, and keep track of your product performance all from your central workspace."
            : "Explore our latest collection of premium goods carefully curated to match your lifestyle, with unbeatable quality and quick delivery."}
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          {isAdmin ? (
            <>
              <Button
                size="lg"
                className="gap-2 cursor-pointer font-semibold"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 cursor-pointer font-semibold bg-background/50 backdrop-blur-sm"
                onClick={() => navigate("/dashboard/products/add")}
              >
                <PlusCircle className="h-4 w-4" /> Add New Product
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              className="gap-2 cursor-pointer font-semibold"
              onClick={() => navigate("/products")}
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
