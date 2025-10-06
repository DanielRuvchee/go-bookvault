"use client"

import { useState } from "react"
import API from "@/lib/api"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" })
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post("/auth/login", form)
            localStorage.setItem("token", res.data.token)
            router.push("/dashboard")
        } catch {
            alert("Invalid credentials")
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-2"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-4"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="bg-blue-600 text-white w-full py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}