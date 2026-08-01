import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { useNavigate } from "react-router";

export default function EmptyProduct() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto my-12 text-center">
      <Card className="py-10 border-dashed">
        <CardContent className="space-y-4">
          <div className="h-16 w-16 bg-muted/60 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <PackageSearch className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">
              Product Not Found
            </h2>
            <p className="text-xs text-muted-foreground">
              We couldn't find the product you're looking for. It may have been
              removed or the link is invalid.
            </p>
          </div>
          <Button className="gap-2" onClick={() => navigate("/products")}>
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
