import axios from "axios"
import { toast } from "sonner"

const { VITE_API_URL } = import.meta.env

const API_URL = `${VITE_API_URL}/product`

async function addProduct(product) {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.post(`${API_URL}/add`, product, { headers: { Authorization: `Bearer ${token}` } })
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
        const res = await axios.put(`${API_URL}/update/${id}`, product, { headers: { Authorization: `Bearer ${token}` } })
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