import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ProductGrid from "../components/product/ProductGrid";
import Pagination from "../components/ui/Pagination"
import Loader from "../components/ui/Loader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({})

  const page = parseInt(searchParams.get("page"), 10) || 1;
  const limit = parseInt(searchParams.get("limit"), 10) || 15;

  async function getProducts() {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://freefakeapi.com/api/products?page=${page}&limit=${limit}`,
      );
      setProducts(response.data.data);
      setPagination(response.data.pagination)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [page]);

  useEffect(() => {
    setSearchParams(params => {
      params.set("page", page)
      params.set("limit", limit)

      return params
    })
  }, [searchParams])

  const handleNextChange = () => {
    console.log(page)
    setSearchParams(params => {
      params.set("page", page + 1)
      return params
    })
  }


  const handlePrevChange = () => {
    setSearchParams(params => {
      params.set("page", page - 1)
      return params
    })
  }

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center flex-col gap-3">
      <Loader />
      <p>Hosla Kro...</p>
    </div>;
  }

  return <div>
    <ProductGrid products={products} />;
    <Pagination pagination={pagination} handleNextChange={handleNextChange} handlePrevChange={handlePrevChange} />
  </div>
}
