import ProductGrid from "./gridView/ProducGrid";
import ProductTable from "./tableView/ProductTable";

export default function ProductBody({
  viewMode,
  products,
  setDeletingProduct,
}) {
  return viewMode === "grid" ? (
    <ProductGrid products={products} setDeletingProduct={setDeletingProduct} />
  ) : (
    <ProductTable products={products} setDeletingProduct={setDeletingProduct} />
  );
}
