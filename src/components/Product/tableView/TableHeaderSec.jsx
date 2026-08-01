import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TableHeaderSec() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Product</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Stock Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
