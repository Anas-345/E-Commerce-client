import { addProduct, singleProduct, updateProduct } from "@/services/products";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function useAddProduct() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    imageFile: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function handleSelectChange(name, value) {
  setFormData((prev) => ({ ...prev, [name]: value }));
}

  async function handleSubmit(e) {
    e.preventDefault();
    const { category } = formData;
    if (!category) return toast.error("Select Category");
    if (!id && !formData.imageFile)
      return toast.error("Please upload an image");

    setLoading(true);

    const res = await (!id
      ? addProduct(formData)
      : updateProduct(formData, id));

    setLoading(false);
    if (res) navigate("/dashboard/products/all");
  }

  async function gettingData() {
    if (!id) {
      setIsPageLoading(false);
      return;
    }
    const product = await singleProduct(id);
    if (product) {
      setFormData((prev) => ({ ...prev, ...product }));
      if (product.imageUrl) {
        setPreviewUrl(product.imageUrl);
      }
    }
    setIsPageLoading(false);
  }

  useEffect(() => {
    gettingData();
  }, [id]);

  return {
    isPageLoading,
    previewUrl,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
    id,
    formData,
    handleSelectChange,
  };
}
