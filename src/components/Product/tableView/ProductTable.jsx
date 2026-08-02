import TableHeaderSec from "./TableHeaderSec";
import TableImg from "./TableImg";
import TableDetails from "./TableDetails";
import TableActions from "./TableActions";
import { Table, TableBody, TableRow } from "@/components/ui/table";

export default function ProductTable({ products, setDeletingProduct }) {
  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <Table>
        <TableHeaderSec />
        <TableBody>
          {products.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableImg product={product} />
                <TableDetails product={product} />
                <TableActions
                  product={product}
                  setDeletingProduct={setDeletingProduct}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
