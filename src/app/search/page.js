


import { client, urlFor } from "@/lib/sanity"
async function getResults(query) {
  if (!query || !query.trim()) return []

  const results = await client.fetch(
    `*[
      _type == "title" &&
      defined(name) &&
      lower(name) match $pattern
    ]{
      _id,
      name,
      poster,
      overview,
      contentType
    }`,
    { pattern: `*${query.trim().toLowerCase()}*` }
  )

  return results
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams
  const query = params.q || ""

  const results = await getResults(query)

  return (
    <main className="page">
      <nav className="navbar">
        <div className="container navbar-inner">
          <h1 className="logo">EntertainSearch</h1>
        </div>
      </nav>

      <section className="center-section">
        <div className="search-box">
          <h2>Results for "{query}"</h2>

          <div style={{ marginTop: "30px", textAlign: "left" }}>
            {results.length === 0 && <p>No results found.</p>}

            {results.map((item) => (
              <div key={item._id} style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                {item.poster && (
                  <img
                    src={urlFor(item.poster).width(120).url()}
                    alt={item.name}
                  />
                )}
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-text">
          © 2026 EntertainSearch
        </div>
      </footer>
    </main>
  )
}