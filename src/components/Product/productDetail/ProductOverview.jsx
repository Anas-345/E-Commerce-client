import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductOverview({ product }) {
  return (
    <div className="pt-6">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-4">
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-base font-semibold">Product Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description ||
                  "No detailed description available for this item."}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium capitalize">
                    {product.category}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Available Stock</span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
