import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyLibrary = () => {
  const { isLoggedIn, loading,library } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login");
      return;
    }

  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return <p className="text-center mt-10">Loading your library...</p>;
  }
  
  

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-semibold mb-6">My Library</h2>

      {error && (
        <p className="text-red-500 text-center mb-6">{error}</p>
      )}

      {library.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Your library is empty. Start adding books 📚
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {library.map((book) => (
            <BookCard
              key={book.id}
              book={{
                id: book.book_id,
                title: book.title,
                author: book.author,
                cover: book.cover_url,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
