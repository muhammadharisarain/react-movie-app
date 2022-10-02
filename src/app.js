import { React, useState } from "react";
import "./app.css";
import MovieCard from "./movieCard";
import searchIcons from "./search.svg";
const API_URL = "http://www.omdbapi.com?apikey=44a2a1c0";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const searchMovies = async (title) => {
    const responce = await fetch(`${API_URL}&s=${title}`);

    const data = await responce.json();
    setMovies(data.Search);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            console.log(e.key);
            if (e.key === "Enter") {
              setLoading(true);
              searchMovies(search);
            }
          }}
        />
        <img
          src={searchIcons}
          alt="search"
          onClick={() => {
            searchMovies(search);
          }}
        />
      </div>
      {loading ? (
        <div className="loading">Loading....</div>
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">No Movie Found</div>
      )}
    </div>
  );
};

export default App;
