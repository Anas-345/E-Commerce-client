import ProductItem from "./ProductItem";

export default function ProductGrid({ products }) {
  return <div className="grid grid-cols-3 gap-5 p-5">
    {
      products.map((product) => <ProductItem product={product} />)
    }
  </div>
}
