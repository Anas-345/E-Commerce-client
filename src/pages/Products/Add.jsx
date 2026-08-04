import { Image as ImageIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
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
import Loader from "@/components/Loader";
import AddProductHeader from "@/components/Product/addProduct/AddProductHeader";
import InputField from "@/components/InputField";
import AddProductFooter from "@/components/Product/addProduct/AddProductFooter";
import useAddProduct from "@/hooks/useAddProduct";

export default function Add() {
  const {
    isPageLoading,
    id,
    handleSubmit,
    formData,
    handleSelectChange,
    handleChange,
    handleFileChange,
    previewUrl,
    loading,
  } = useAddProduct();
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {isPageLoading ? (
        <Loader content={"Please wait a little..."} />
      ) : (
        <>
          <AddProductHeader id={id} />

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Fill in all the information required for this product.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <InputField
                  type="text"
                  id="name"
                  name="Product Name"
                  value={formData.name}
                  handleChange={handleChange}
                  placeholder="e.g. Wireless Noise-Canceling Headphones"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(e) => handleSelectChange("category", e)}
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

                  <InputField
                    type="number"
                    id="price"
                    name="Price ($)"
                    placeholder="29.99"
                    value={formData.price}
                    handleChange={handleChange}
                  />
                </div>
                <InputField
                  type="number"
                  id="stock"
                  name="Stock Quantity"
                  placeholder="100"
                  value={formData.stock}
                  handleChange={handleChange}
                />

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

              <AddProductFooter loading={loading} id={id} />
            </Card>
          </form>
        </>
      )}
    </div>
  );
}
