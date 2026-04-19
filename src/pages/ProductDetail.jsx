import { useEffect } from "react"
import { useParams } from "react-router"
import axios from "axios"

export default function ProductDetail() {
  const { id } = useParams()

  async function getProductDetails(prodId) {
    try {
      const response = await axios.get(`https://freefakeapi.com/api/products/${prodId}`)
      console.log(response)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductDetails(id)
  }, [id])

  return <h1>Hello</h1>;
}
