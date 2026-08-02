import { toast } from "sonner";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { addOrder } from "@/services/order";
import { useCart } from "@/context/useCart";
import { useNavigate } from "react-router";

export default function CheckoutForm({ setSubmitting }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  const { totalPrice, cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    const phone = formData.phone.trim();
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !phone ||
      !formData.address.trim() ||
      !formData.city.trim()
    )
      return toast.error("Please fill required fields");

    if (phone.length !== 13 || !phone.startsWith("+92"))
      return toast.error("Enter valid phone number");

    setSubmitting(true);
    const res = await addOrder({ ...formData, totalPrice, items: cartItems });
    if (!res) {
      setSubmitting(false);
      return;
    }
    clearCart();
    setSubmitting(false);
    navigate("/dashboard/orders");
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg">Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="checkout-form"
          onSubmit={handlePlaceOrder}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+92 000-0000000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                placeholder="Faisalabad"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Shipping Address *</Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="postalCode">Postal Code (Optional)</Label>
              <Input
                id="postalCode"
                name="postalCode"
                placeholder="0000"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Delivery instructions or notes..."
              value={formData.notes}
              onChange={handleChange}
              className="h-20"
            />
          </div>
        </form>
      </CardContent>
    </>
  );
}
