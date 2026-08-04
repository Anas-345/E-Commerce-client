import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/useCart";
import { addOrder } from "@/services/order";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function useCheckout() {
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

  async function handlePlaceOrder(e, setSubmitting) {
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

  return {
    formData,
    handleChange,
    handlePlaceOrder,
  };
}
