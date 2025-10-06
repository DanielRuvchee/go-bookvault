"use client"

import { useState } from "react"
import API from "@/lib/api"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.pereventDefault()
        try {
            await API.post("/auth/register", form)
            router.push("/login")
        } catch (err) {
            alert("Registration failed")
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-full mb-2"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
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
                    Sign Up
                </button>
            </form>
        </div>
    );
}