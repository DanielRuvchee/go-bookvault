"use client"

import { useState } from "react"
import API from "@/lib/api"
import { useRouter } from "next/navigation"
import { Input, InputBlock } from "@/components/Input"

export default function RegisterPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        try {
            const res = await API.post("/register", form)
            if (res.status === 201) router.push("/")
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-2xl p-8 border-2 border-gray-900">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-600">Join BookVault today</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <InputBlock variant="neubrutalism" size="lg">
                                <Input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    required
                                />
                            </InputBlock>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <InputBlock variant="neubrutalism" size="lg">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </InputBlock>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <InputBlock variant="neubrutalism" size="lg">
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                />
                            </InputBlock>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg border-2 border-gray-900 shadow-[4px_4px_0px_rgb(17,24,39)] hover:shadow-[2px_2px_0px_rgb(17,24,39)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0px_rgb(17,24,39)]"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}