import Link from "next/link"
import BlurIn from "@/components/BlurIn"
import Button_v1 from "@/components/Button_v1"
import Separator from "@/components/Separator"
import MultilayerCardV_1 from "@/components/MultilayerCardV_1"

async function getBooks() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:8080")
  const res = await fetch(`${apiBase}/books`, { cache: "no-store" })
  if (!res.ok) return []
  return res.json()
}

export default async function Home() {
  const books = await getBooks()

  return (
    <div className="min-h-screen px-6 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Daniel Ruvche Book Vault</h1>
        <div className="flex items-center gap-3">
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
        </div>
      </header>

      <section className="mt-32 flex flex-col items-center text-center">
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

      <main className="mt-12">
        <h2 className="text-xl font-bold mb-4">All Books in the Vault:</h2>
        {books.length === 0 ? (
          <p className="text-gray-600">No books in the vault</p>
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
    </div>
  )
}
