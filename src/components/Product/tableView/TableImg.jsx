import { TableCell } from "@/components/ui/table";
import { useNavigate } from "react-router";

export default function TableImg({ product }) {
  const navigate = useNavigate();
  return (
    <TableCell>
      <div className="flex items-center gap-3">
        <img
          src={product.imageUrl}
          alt=""
          className="h-10 w-10 rounded-lg object-cover border"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
          }}
        />
        <div>
          <p
            className="font-medium text-sm line-clamp-1 cursor-pointer hover:text-primary transition-colors"
            onClick={() =>
              navigate(`/dashboard/products/details/${product.id}`)
            }
          >
            {product.name}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {product.description}
          </p>
        </div>
      </div>
    </TableCell>
  );
}
