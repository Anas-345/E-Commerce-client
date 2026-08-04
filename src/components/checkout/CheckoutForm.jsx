import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import InputField from "../InputField";
import useCheckout from "@/hooks/useCheckout";
import { Input } from "../ui/input";

export default function CheckoutForm({ setSubmitting }) {
  const { formData, handleChange, handlePlaceOrder } = useCheckout();
  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg">Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="checkout-form"
          onSubmit={(e) => handlePlaceOrder(e, setSubmitting)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "Full Name *",
                id: "fullName",
                placeholder: "John",
                value: formData.fullName,
                type: "text",
              },
              {
                name: "Email Address *",
                id: "email",
                placeholder: "name@example.com",
                value: formData.email,
                type: "email",
              },
            ].map((o, i) => (
              <InputField
                key={i}
                type={o.type}
                id={o.id}
                name={o.name}
                placeholder={o.placeholder}
                value={o.value}
                handleChange={handleChange}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "Phone Number *",
                id: "phone",
                placeholder: "+92 000-0000000",
                value: formData.phone,
                type: "text",
              },
              {
                name: "City *",
                id: "city",
                placeholder: "Faisalabad",
                value: formData.city,
                type: "text",
              },
            ].map((o, i) => (
              <InputField
                key={i}
                type={o.type}
                id={o.id}
                name={o.name}
                placeholder={o.placeholder}
                value={o.value}
                handleChange={handleChange}
              />
            ))}
          </div>
          <InputField
            type="text"
            id="address"
            name="Shipping Address *"
            placeholder="123 Main Street"
            value={formData.address}
            handleChange={handleChange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
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
