import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  PackageCheck,
  PackageX,
  LayoutGrid,
  List,
  Loader2,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allProducts, deleteProduct } from "@/services/products";
import { toast } from "sonner";

export default function All() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const [deletingProduct, setDeletingProduct] = useState(null);

  async function handleDeleteProduct() {
    const res = await deleteProduct(deletingProduct);
    setDeletingProduct(null);
    if (!res) return;
    toast.success("Item deleted successfully");
    getProducts();
  }

  async function getProducts() {
    try {
      setLoading(true);
      const data = await allProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            {isAdmin
              ? "Manage your product catalog, prices, and inventory stock."
              : "Browse our latest products and exclusive deals."}
          </p>
        </div>

        {isAdmin && (
          <Button
            onClick={() => navigate("/dashboard/products/add")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add New Product
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-3 rounded-xl border">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-8" />
          </div>

          <Select>
            <SelectTrigger className="w-40">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="home">Home & Kitchen</SelectItem>
              <SelectItem value="beauty">Beauty & Care</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1 border rounded-lg p-1 bg-muted/40 self-end sm:self-auto">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-87.5 space-y-3 bg-card/50 border rounded-xl p-8">
          <Loader2 className="h-9 w-9 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">
            Fetching products...
          </p>
        </div>
      ) : products.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent className="space-y-3">
            <PackageX className="h-10 w-10 text-muted-foreground mx-auto" />
            <CardTitle>No products found</CardTitle>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or filters.
            </p>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id || product._id}
              className="overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-square bg-muted overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/600x600?text=No+Image";
                  }}
                />
                <Badge
                  variant="secondary"
                  className="absolute top-2.5 left-2.5 capitalize backdrop-blur-md bg-background/80"
                >
                  {product.category}
                </Badge>

                {!isAdmin && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full shadow"
                  >
                    <Heart className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                )}
              </div>

              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base line-clamp-1">
                    {product.name}
                  </CardTitle>

                  {isAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/dashboard/products/edit/${product.id}`)
                          }
                        >
                          <Pencil className="h-4 w-4 mr-2" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeletingProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0 flex-1 space-y-2">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold">
                    ${Number(product.price || 0).toFixed(2)}
                  </span>
                  {product.stock > 0 ? (
                    <Badge
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30"
                    >
                      In Stock ({product.stock})
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-destructive border-destructive/20 bg-destructive/10"
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                {isAdmin ? (
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-xs"
                    onClick={() =>
                      navigate(`/dashboard/products/edit/${product.id}`)
                    }
                  >
                    <Pencil className="h-3.5 w-3.5" /> Quick Edit
                  </Button>
                ) : (
                  <Button
                    className="w-full gap-2"
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to Cart
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-xl bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id || product._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="h-10 w-10 rounded-lg object-cover border"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/600x600?text=No+Image";
                        }}
                      />
                      <div>
                        <p className="font-medium text-sm line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {product.category}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${Number(product.price || 0).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {product.stock > 0 ? (
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <PackageCheck className="h-3.5 w-3.5" /> {product.stock}{" "}
                        units
                      </span>
                    ) : (
                      <span className="text-xs text-destructive font-medium flex items-center gap-1">
                        <PackageX className="h-3.5 w-3.5" /> Out of stock
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isAdmin ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            navigate(`/dashboard/products/edit/${product.id}`)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => setDeletingProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" disabled={product.stock === 0}>
                        <ShoppingBag className="h-3.5 w-3.5 mr-1.5" /> Add
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog
        open={!!deletingProduct}
        onOpenChange={() => setDeletingProduct(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deletingProduct?.name}</strong>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeletingProduct(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
