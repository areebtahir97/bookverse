import { useParams,useLocation } from "react-router-dom";
import { dummyBooks } from "../data/dummyBooks";
import { useAuth } from "../context/AuthContext";
import { useState,useEffect } from "react";
import noCover from "../assets/no-cover.png";

function BookDetails() {
  const [description, setDescription] = useState("");
  const [loadingDesc, setLoadingDesc] = useState(true);

  


  const { id } = useParams();
  const location = useLocation();
  const book = location.state?.book;

  

  if (!book) {
    return <p className="text-center mt-10">Book not found</p>;
  }
  const { isLoggedIn, library, setLibrary } = useAuth();
  const isInLibrary = library.some(
  (b) => b.book_id === book.id
    );  

  //get boodk description
  useEffect(() => {
    async function fetchDescription() {
      try {
        const res = await fetch(
          `https://openlibrary.org/works/${book.id}.json`
        );
        const data = await res.json();

        const desc =
          typeof data.description === "string"      //this basically checks if dexc is a string then uses data.desc .if its not then (it wil be obj) it will get it value...? is used if there no value then return undefined
            ? data.description
            : data.description?.value;

        setDescription(desc || "No description available for this book.");
      } catch {
        setDescription("Failed to load description.");
      } finally {
        setLoadingDesc(false);
      }
    }

    fetchDescription();
  }, [book.id]);
    

  async function handleAdd() {
    if (!isLoggedIn) {
      alert("Please login to add books");
      return;
    }

    const res = await fetch("http://localhost:3000/api/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        bookId: book.id,
        title: book.title,
        author: book.author,
        coverUrl: book.cover,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }
    

    setLibrary((prev) => [data.book, ...prev]);
  }

  async function handleRemove() {
    const res = await fetch(
      `http://localhost:3000/api/library/${book.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) return;

    // Update global state immediately
    setLibrary(prev =>
      prev.filter(b => String(b.book_id) !== String(book.id))
    );
  }
  

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">

        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 rounded-xl p-4">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full object-contain"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold">{book.title}</h1>
          <p className="text-gray-500 mt-2">{book.author}</p>

          <p className="mt-6 text-gray-700 leading-relaxed">
              {loadingDesc ? "Loading description..." : description}
          </p>
          <div className="mt-10 flex gap-4">
            {!isInLibrary ? (
              <button
                onClick={handleAdd}
                className="px-6 py-2.5 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 hover:scale-105 transition-all duration-200">
                Add to Library
              </button>
            ) : (
              <>
                <button
                  disabled
                  className="px-6 py-2.5 rounded-full bg-gray-300 text-gray-700
                                cursor-not-allowed"
                >
                  Added ✓
                </button>

                <button
                  onClick={handleRemove}
                  className="px-6 py-2.5 rounded-full bg-red-500 text-white
                                hover:bg-red-600 hover:scale-105 transition-all duration-300"
                >
                  Remove
                </button>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default BookDetails