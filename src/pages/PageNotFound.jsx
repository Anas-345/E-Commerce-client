import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Compass, Package, AlertTriangle } from "lucide-react";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-dashed shadow-sm text-center">
        <CardContent className="pt-10 pb-8 px-6 space-y-6">
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <AlertTriangle className="h-12 w-12 text-primary animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              404
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Oops! The page you are looking for doesn't exist, was removed, or
              had its URL changed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto gap-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </Button>

            <Button
              size="sm"
              className="w-full sm:w-auto gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4" /> Back to Home
            </Button>
          </div>

          <div className="border-t pt-6 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Looking for something else?
            </p>
            <div className="flex justify-center gap-4 text-xs font-medium text-primary">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Compass className="h-3.5 w-3.5" /> Dashboard
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                type="button"
                onClick={() => navigate("/dashboard/products/all")}
                className="hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Package className="h-3.5 w-3.5" /> All Products
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
