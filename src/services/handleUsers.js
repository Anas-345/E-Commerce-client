import axios from "axios"
import { toast } from "sonner"

const { VITE_API_URL } = import.meta.env

const API_URL = `${VITE_API_URL}/users`

async function getUsers() {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${API_URL}/all`, { headers: { Authorization: `Bearer ${token}` } })
        toast.success(res.data.message)
        return res.data.users
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

async function updateUser(id, role) {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.put(`${API_URL}/update/${id}`, { role }, { headers: { Authorization: `Bearer ${token}` } })
        toast.success(res.data.message)
        return true
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

async function deleteUser(id) {
    try {
        const token = localStorage.getItem('token')
        await axios.delete(`${API_URL}/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return true
    } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong')
        return false
    }
}

export { getUsers, updateUser, deleteUser }