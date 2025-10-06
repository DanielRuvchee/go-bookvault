"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) router.push("/login")

        API.get("/users/me")
            .then((res) => setUser(res.data))
            .catch(() => router.push("/login"))
    }, [router])

    if (!user) return <p className="text-center mt-20">Loading...</p>

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
            <p className="text-gray-600 mb-4">Email: {user.email}</p>
            <button
                onClick={() => {
                    localStorage.removeItem("token")
                    router.push("/login")
                }}
                className="bg-red-500 text-white py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    )
}