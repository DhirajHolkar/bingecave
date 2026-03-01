

"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import '@/styles/landing-page.css'

export default function Home() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()

    if (!query.trim()) return

    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <main className="page">

      <nav className="navbar">
        <div className="container navbar-inner">
          <h1 className="logo">EntertainSearch</h1>

          <div className="nav-links">
            <button>Movies</button>
            <button>TV Shows</button>
            <button>Anime</button>
          </div>
        </div>
      </nav>

      <section className="center-section">
        <div className="search-box">
          <h2>Search Movies, Shows & Anime</h2>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search any movie or show..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-text">
          © 2026 EntertainSearch — Built by Dhiraj
        </div>
      </footer>

    </main>
  )
}