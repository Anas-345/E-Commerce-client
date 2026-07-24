import axios from "axios"
import { toast } from "sonner"

const { VITE_API_URL } = import.meta.env

const API_URL = `${VITE_API_URL}/auth`

async function handleRegister(user) {
    try {
        const res = await axios.post(`${API_URL}/register`, user)
        toast.success(res.data.message)
        return true
    } catch (error) {
        toast.error(error.response.data.message)
        return false
    }
}

async function handleLogin(user) {
    try {
        const res = await axios.post(`${API_URL}/login`, user)
        toast.success(res.data.message)
        const token = res.data.token
        return token
    } catch (error) {
        toast.error(error.response.data.message)
        return false
    }
}

async function handleProfile(token) {
    try {
        const res = await axios.get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
        return res.data.user
    } catch (error) {
        if (localStorage.getItem('token')) localStorage.removeItem('token')
        return false
    }
}

export { handleRegister, handleLogin, handleProfile }