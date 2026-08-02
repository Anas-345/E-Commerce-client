import { Card } from "../../ui/card";
import CardImg from "./CardImg";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardFoot from "./CardFoot";

export default function ProductGrid({ products, setDeletingProduct }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        return (
          <Card
            key={product.id}
            className="overflow-hidden flex flex-col group"
          >
            <CardImg product={product} />

            <CardHead
              setDeletingProduct={setDeletingProduct}
              product={product}
            />

            <CardBody product={product} />
            <CardFoot product={product} />
          </Card>
        );
      })}
    </div>
  );
}
