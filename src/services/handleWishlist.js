import axios from "axios"
import { toast } from "sonner"

const { VITE_API_URL } = import.meta.env

const API_URL = `${VITE_API_URL}/wishlist`

async function getWishlist() {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${API_URL}/all`, { headers: { Authorization: `Bearer ${token}` } })
        toast.success(res.data.message)
        return res.data.wishlistProducts
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

async function addToWishlist(id) {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.put(`${API_URL}/add`, { id }, { headers: { Authorization: `Bearer ${token}` } })
        toast.success(res.data.message)
        return true
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

async function removeFromWishlist(id) {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.put(`${API_URL}/remove`, { id }, { headers: { Authorization: `Bearer ${token}` } })
        toast.success(res.data.message)
        return true
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

export { getWishlist, addToWishlist , removeFromWishlist}