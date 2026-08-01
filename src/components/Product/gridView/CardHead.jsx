import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

export default function CardHead({ product, setDeletingProduct }) {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  return (
    <CardHeader className="p-4 pb-2">
      <div className="flex items-start justify-between gap-2">
        <CardTitle
          className="text-base line-clamp-1 cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate(`/dashboard/products/details/${product.id}`)}
        >
          {product.name}
        </CardTitle>

        {isAdmin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <Eye className="h-4 w-4 mr-2" /> View Details
              </DropdownMenuItem>
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
  );
}
