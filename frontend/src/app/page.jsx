"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import BlurIn from "@/components/BlurIn"
import Button_v1 from "@/components/Button_v1"
import Separator from "@/components/Separator"
import MultilayerCardV_1 from "@/components/MultilayerCardV_1"
import CarouselDemo from "@/components/CarouselDemo"
import API from "@/lib/api"
import { cn } from "@/lib/utils"

const quotes = [
    {
        title: "The Great Gatsby — F. Scott Fitzgerald",
        description: "So we beat on, boats against the current, borne back ceaselessly into the past.",
    },
    {
        title: "A Tale of Two Cities — Charles Dickens",
        description: "It was the best of times, it was the worst of times.",
    },
    {
        title: "The Fellowship of the Ring — J.R.R. Tolkien",
        description: "All we have to decide is what to do with the time that is given us.",
    },
    {
        title: "I Know Why the Caged Bird Sings — Maya Angelou",
        description: "There is no greater agony than bearing an untold story inside you.",
    },
    {
        title: "Harry Potter and the Sorcerer's Stone — J.K. Rowling",
        description: "It does not do to dwell on dreams and forget to live.",
    },
    {
        title: "The Perks of Being a Wallflower — Stephen Chbosky",
        description: "We accept the love we think we deserve.",
    },
]

const QuoteCard = ({ title, description }) => {
    return (
        <div>
            <div className="border-[0.5px] border-zinc-400 dark:border-white/70 relative shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.85)] hover:border-zinc-900 dark:hover:border-white cursor-pointer bg-white dark:bg-zinc-900">
                <div className={cn("text-start", "p-6")}>
                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">{title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    const [books, setBooks] = useState([])
    const [isAuthed, setIsAuthed] = useState(false)

    const fetchBooks = async (authed) => {
        try {
            if (authed) {
                const res = await API.get("/books/mine")
                setBooks(res.data || [])
            } else {
                const res = await API.get("/books")
                setBooks(res.data || [])
            }
        } catch {
            setBooks([])
        }
    }

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        const authed = !!token
        setIsAuthed(authed)
        fetchBooks(authed)
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem("token")
        setIsAuthed(false)
        fetchBooks(false)
    }

    return (
        <div className="min-h-screen px-6 py-8">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Daniel Ruvche Book Vault</h1>
                <div className="flex items-center gap-3">
                    {isAuthed ? (
                        <Button_v1 onClick={handleLogout}>
                            Logout
                        </Button_v1>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button_v1>
                                    Login
                                </Button_v1>
                            </Link>
                            <Link href="/register">
                                <Button_v1>
                                    Register
                                </Button_v1>
                            </Link>
                        </>
                    )}
                </div>
            </header>

            {!isAuthed && (
                <>
                    <section className="min-h-screen flex flex-col items-center justify-center text-center">
                        <BlurIn>
                            Your personal vault for discovering, tracking, and cherishing books.
                            <br></br>- Daniel Ruvcheski
                        </BlurIn>
                        <p className="mt-4 max-w-2xl text-gray-400">
                            Browse community-curated titles, keep your reading list organized, and never
                            lose track of a great read again.
                        </p>
                    </section>

                    <div className="mt-16">
                        <Separator gradient />
                    </div>

                    <div className="mt-8">
                        <CarouselDemo />
                    </div>

                    <div className="mt-16">
                        <Separator gradient />
                    </div>

                    <section className="mt-12">
                        <h2 className="text-xl font-bold mb-8 text-center">Famous Book Quotes</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quotes.map((q, idx) => (
                                <QuoteCard key={idx} title={q.title} description={q.description} />
                            ))}
                        </div>
                    </section>
                </>
            )}

            {isAuthed && (
                <main className="mt-12">
                    <h2 className="text-xl font-bold mb-4">Your Books:</h2>
                    {books.length === 0 ? (
                        <p className="text-gray-600">No books in your vault</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {books.map((b) => (
                                <MultilayerCardV_1
                                    key={b.id}
                                    title={b.title}
                                    description={`${b.Author}${b.Description ? ` - ${b.Description}` : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </main>
            )}
        </div>
    )
}