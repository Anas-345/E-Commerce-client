import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  PlusCircle,
  Image as ImageIcon,
  ArrowLeft,
  Loader2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addProduct, singleProduct, updateProduct } from "@/services/products";
import { toast } from "sonner";

export default function Add() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    imageFile: null, // Stores the uploaded File object
  });

  const [previewUrl, setPreviewUrl] = useState(""); // Stores preview URL (Blob or existing image URL)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handle local File Selection
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file)); // Create local temporary URL for preview
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { category } = formData;
    if (!category) return toast.error("Select Category");
    if (!id && !formData.imageFile) return toast.error("Please upload an image");

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
        setPreviewUrl(product.imageUrl); // Fallback if editing existing product with hosted URL
      }
    }
    setIsPageLoading(false);
  }

  useEffect(() => {
    gettingData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {isPageLoading ? (
        <>
          <div className="flex flex-col items-center justify-center min-h-87.5 space-y-3 bg-card/50 border rounded-xl p-8">
            <Loader2 className="h-9 w-9 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">
              Please wait a little...
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/dashboard/products/all")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {!id ? "Add New Product" : "Edit Product"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {!id ? "Create a new" : "Update"} item to display in your store
                catalog.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Fill in all the information required for this product.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Wireless Noise-Canceling Headphones"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(e) =>
                        setFormData((prev) => ({ ...prev, category: e }))
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="home">Home & Kitchen</SelectItem>
                        <SelectItem value="beauty">Beauty & Care</SelectItem>
                        <SelectItem value="sports">
                          Sports & Outdoors
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="29.99"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="100"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* --- FILE UPLOAD FIELD --- */}
                <div className="space-y-2">
                  <Label htmlFor="imageUpload">Product Image</Label>
                  <div className="flex gap-3">
                    <Input
                      id="imageUpload"
                      name="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required={!id && !previewUrl}
                      className="cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload a JPEG, PNG, or WebP image file.
                  </p>
                </div>

                {/* --- IMAGE PREVIEW --- */}
                {previewUrl && (
                  <div className="border rounded-lg p-3 bg-muted/30 space-y-2">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <ImageIcon className="h-3.5 w-3.5" /> Image Preview
                    </Label>
                    <div className="h-48 w-full rounded-md overflow-hidden bg-background border flex items-center justify-center">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/600x400?text=Invalid+Image";
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Write a clear and engaging product description..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-3 border-t pt-4">
                <Button
                  type="button"
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => navigate("/dashboard/products/all")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="gap-2 cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  {loading
                    ? !id
                      ? "Creating..."
                      : "Updating..."
                    : !id
                      ? "Save Product"
                      : "Update Product"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </>
      )}
    </div>
  );
}