import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

const API = axios.create({
    baseURL,
})

API.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default API