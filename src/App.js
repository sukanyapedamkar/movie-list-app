import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

//API Key - 43d555d8

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=43d555d8";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Deadpool");
  }, []);
  return (
    <div className="app">
      <h1> Movie List App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="serach for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value.length > 0 ? e.target.value : "");
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm.length > 0 ? searchTerm : "")}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2> No Movies Found!!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
