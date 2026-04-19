import { useNavigate } from "react-router";

export default function ProductItem({ product }) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/products/${product._id}`);
  }

  const isAvailable = product.stock > 0;

  return (
    <div className="cursor-pointer bg-[#181a20] flex flex-col rounded-lg hover:bg-[#22252b] duration-300 transition-all ease-in-out">
      <div
        className="flex items-center justify-center hover:scale-105 duration-300 transition-all ease-in-out"
        onClick={handleNavigate}
      >
        <img src="https://static.thenounproject.com/png/1077596-200.png" />
      </div>
      <div className="mx-4 my-4">
        <p className="font-semibold text-lg font-mono">{product.name}</p>
        <p className="text-sm italic text-[#9ca3af] -mt-1">
          {product.description}
        </p>
        <p className="font-bold text-2xl text-[#f97316] border-t border-gray-800 mt-3">
          $ {product.price}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-[#f97316] hover:bg-[#ea580c] transition-all duration-300 ease-in-out px-8 py-2 rounded-3xl text-white flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-900"
          disabled={!isAvailable}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
