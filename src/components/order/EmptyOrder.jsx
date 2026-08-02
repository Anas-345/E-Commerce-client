import { ArrowRight, Package } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";

export default function EmptyOrder() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto my-12 text-center">
      <Card className="py-10 border-dashed">
        <CardContent className="space-y-4">
          <div className="h-16 w-16 bg-muted/60 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <Package className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">
              {isAdmin ? "No orders found" : "No orders yet"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isAdmin
                ? "No customer orders have been placed in the database yet."
                : "You haven't placed any orders yet. Start shopping to see your orders here!"}
            </p>
          </div>
          {!isAdmin && (
            <Button
              onClick={() => navigate("/dashboard/products/all")}
              className="gap-2"
            >
              Browse Catalog <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
