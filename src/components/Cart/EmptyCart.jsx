import { useNavigate } from "react-router"
import { Card, CardContent } from "../ui/card"
import { ShoppingBag } from "lucide-react"
import { Button } from "../ui/button"

export default function EmptyCart() {
    const navigate = useNavigate()
    return <div className="max-w-md mx-auto my-12 text-center">
        <Card className="py-10 border-dashed">
          <CardContent className="space-y-4">
            <div className="h-16 w-16 bg-muted/60 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight">
                Your cart is empty
              </h2>
              <p className="text-xs text-muted-foreground">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
            <Button onClick={() => navigate("/products")}>
              Explore Products
            </Button>
          </CardContent>
        </Card>
      </div>
}