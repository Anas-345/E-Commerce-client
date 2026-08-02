import { Mail, MapPin, Phone, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

export default function OrderDetails({
  selectedOrder,
  setSelectedOrder,
  getStatusBadgeVariant,
}) {
  return (
    <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
      {selectedOrder && (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg flex items-center justify-between pr-6">
              <span>Order Details</span>
              <Badge
                variant="outline"
                className={`capitalize font-mono text-xs ${getStatusBadgeVariant(
                  selectedOrder.status,
                )}`}
              >
                {selectedOrder.status || "Pending"}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/40 p-3 rounded-lg text-xs space-y-1 sm:space-y-0">
              <div className="space-y-1">
                <p className="font-semibold text-muted-foreground flex items-center gap-1">
                  <User className="h-3.5 w-3.5" /> Customer Info
                </p>
                <p className="font-medium text-sm">{selectedOrder.fullName}</p>
                <p className="flex items-center gap-1 text-muted-foreground">
                  <Mail className="h-3 w-3" /> {selectedOrder.email}
                </p>
                <p className="flex items-center gap-1 text-muted-foreground">
                  <Phone className="h-3 w-3" /> {selectedOrder.phone}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Shipping Address
                </p>
                <p>{selectedOrder.address}</p>
                <p>
                  {selectedOrder.city}
                  {selectedOrder.postalCode
                    ? `, ${selectedOrder.postalCode}`
                    : ""}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground">
                Ordered Products
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedOrder.items?.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex items-center gap-3 text-xs border-b pb-2"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-10 w-10 rounded object-cover bg-muted shrink-0"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/100x100?text=No+Image";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-muted-foreground">
                        ${Number(item.price).toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-sm font-bold">
              <span>Total Order Amount</span>
              <span className="text-base text-primary">
                ${Number(selectedOrder.totalPrice || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
