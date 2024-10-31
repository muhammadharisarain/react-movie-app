import { React, useEffect, useState } from "react";
import "./app.css";
import MovieCard from "./movieCard";
import searchIcons from "./search.svg";
import GenureSelect from "./genureSelect";
const API_URL = "http://www.omdbapi.com?apikey=44a2a1c0";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [genureSelect, setGenureSelect] = useState("");
  const searchMovies = async (title) => {
    const responce = await fetch(`${API_URL}&s=${title}${genureSelect ? `&type=${genureSelect === "Movie" ? "movie" : "series"}` : ""}`);

    const data = await responce.json();
    console.log(data);
    setMovies(data.Search ? data.Search : []);
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      searchMovies(search);
    }
  }, [search]);

  return genureSelect === "" ? (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#e2aa4a", fontWeight: "bold", marginBottom: "20px" }}>Please select a genre</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <GenureSelect type="Movie" onClick={() => setGenureSelect("Movie")} />
          <GenureSelect type="Series" onClick={() => setGenureSelect("Series")} />
        </div>
      </div>
    </>
  ) : (
    <div className="app">
      <h1>{`${genureSelect} Land`}</h1>
      <div className="search">
        <input
          placeholder={`Search for ${genureSelect}`}
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
        <div className="empty">{search && movies?.length === 0 ? `No ${genureSelect} Found` : `Search for ${genureSelect}`}</div>
      )}
    </div>
  );
};

export default App;
