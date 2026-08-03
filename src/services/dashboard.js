import axios from "axios"
import { toast } from "sonner"

const { VITE_API_URL } = import.meta.env

const API_URL = `${VITE_API_URL}/dashboard`

async function getDashboardData() {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${API_URL}/data`, { headers: { Authorization: `Bearer ${token}` } })
        return res.data.data
    } catch (error) {
        toast.error(error.response.data.message)
        return false
    }
}


export { getDashboardData }