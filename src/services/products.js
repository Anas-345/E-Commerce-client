import axios from "axios"
import { toast } from "sonner"

const { VITE_API_URL } = import.meta.env

const API_URL = `${VITE_API_URL}/product`

async function addProduct(product) {
    try {
        const token = localStorage.getItem('token')

        // 💥 Construct FormData to send files + text fields
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('category', product.category)
        formData.append('price', product.price)
        formData.append('stock', product.stock)

        if (product.imageFile) {
            formData.append('image', product.imageFile)
        }

        const res = await axios.post(`${API_URL}/add`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // 👈 Crucial header!
            }
        })
        toast.success(res.data.message)
        return true
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

async function updateProduct(product, id) {
    try {
        const token = localStorage.getItem('token')

        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('category', product.category)
        formData.append('price', product.price)
        formData.append('stock', product.stock)

        if (product.imageFile) {
            formData.append('image', product.imageFile)
        }

        const res = await axios.put(`${API_URL}/update/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        toast.success(res.data.message)
        return true
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

async function deleteProduct(id) {
    try {
        const token = localStorage.getItem('token')
        await axios.delete(`${API_URL}/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return true
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

async function allProducts() {
    try {
        const res = await axios.get(`${API_URL}/all`)
        toast.success(res.data.message)
        return res.data.products
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return []
    }
}

async function singleProduct(id) {
    try {
        const res = await axios.get(`${API_URL}/single/${id}`)
        toast.success(res.data.message)
        return res.data.product
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return null
    }
}

export { addProduct, allProducts, singleProduct, updateProduct, deleteProduct }