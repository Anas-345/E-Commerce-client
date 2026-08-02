import axios from "axios"
import { toast } from "sonner"

const { VITE_API_URL } = import.meta.env

const API_URL = `${VITE_API_URL}/order`

async function addOrder(data) {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.post(`${API_URL}/add`, data, { headers: { Authorization: `Bearer ${token}` } })
        toast.success(res.data.message)
        return true
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

async function allOrders() {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${API_URL}/all`, { headers: { Authorization: `Bearer ${token}` } })
        toast.success(res.data.message)
        return res.data.orders
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return []
    }
}

async function updateOrder(id, status) {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.put(`${API_URL}/update`, { id, status }, { headers: { Authorization: `Bearer ${token}` } })
        toast.success(res.data.message)
        return true
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

export { addOrder, allOrders, updateOrder }