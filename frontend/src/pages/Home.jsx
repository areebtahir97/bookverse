import { useState,useEffect } from "react";
import BookCard from "../components/BookCard";
import BookSearch from "../components/BookSearch.jsx";

import '../index.css'




export default function Home() {
  const [searchText,setSeacrhText]=useState("")
  const [books,setBooks]=useState([])
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")

  useEffect(() => {
    fetchTrending();
  }, []);

  //get fiction 10 books for home
  async function fetchTrending() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://openlibrary.org/subjects/science_fiction.json?limit=10"
      );
      const data = await res.json();

      const mappedBooks = data.works.map((item) => ({
        id: item.key.replace("/works/", ""),
        title: item.title,
        author: item.authors?.[0]?.name || "Unknown Author",
        cover: item.cover_id
          ? `https://covers.openlibrary.org/b/id/${item.cover_id}-L.jpg`
          : null,
      }));

      setBooks(mappedBooks);
    } catch {
      setError("Failed to load trending books");
    } finally {
      setLoading(false);
    }
  }

  //handle search
  async function handleSearch() {
    if (!searchText.trim()) return;

    setLoading(true)
    setError("")

    try {
      const res=await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchText)}`)

      const data=await res.json()

      //map open library to internal format
      const mappedBooks = data.docs.slice(0, 10).map((item) => ({
        id: item.key?.replace("/works/", ""), 
        title: item.title,
        author: item.author_name?.[0] || "Unknown Author",
        cover: item.cover_i
          ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
          : null,
      }));

      setBooks(mappedBooks)


    } catch (error) {
      setError("Failed to fetch books")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="px-6 py-10">
      <p className="pinyon-script-regular text-3xl font-semibold  text-center text-gray-500 mb-6">
          Your personal book companion.
      </p>
      <BookSearch onSearch={handleSearch} onChange={setSeacrhText} value={searchText} />
      <h2 className="text-2xl font-semibold mb-6 mt-4">
        {searchText ? "Search Results" : "Trending Books"}
      </h2>

      {loading && (
        <p className="text-center text-gray-500 ">Searching books...</p>
      )}

      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}