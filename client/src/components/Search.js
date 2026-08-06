import React, { useState } from "react";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/books/search?query=${query}`
      );
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books");
    }
  };

  return (
    <div>
      <h2>Search Books</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h4>{book.volumeInfo.title}</h4>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
        