import { TableCell } from "@/components/ui/table";
import { PackageCheck, PackageX } from "lucide-react";

export default function TableDetails({ product }) {
  return (
    <>
      <TableCell className="capitalize">{product.category}</TableCell>
      <TableCell className="font-semibold">
        ${Number(product.price || 0).toFixed(2)}
      </TableCell>
      <TableCell>
        {product.stock > 0 ? (
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <PackageCheck className="h-3.5 w-3.5" /> {product.stock} units
          </span>
        ) : (
          <span className="text-xs text-destructive font-medium flex items-center gap-1">
            <PackageX className="h-3.5 w-3.5" /> Out of stock
          </span>
        )}
      </TableCell>
    </>
  );
}
