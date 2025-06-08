import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import StarRating from "./StarRating";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const watched = tempWatchedData;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await fetchMovies({ searchQuery });
        setSearchResults(results);
      } catch (err) {
        // console.error("Error fetching movies:", err);
        setErrorMessage(err.message);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => setErrorMessage("");
  }, [searchQuery]);

  return (
    <>
      <Navbar>
        <SearchBar placeholder="Search movies..." onSearch={setSearchQuery} />
        <NumberOfSearchResult numOfResults={searchResults.length} />
      </Navbar>
      <Main>
        <Box
          element={
            <>
              {isLoading && <p className="loader">Loading...</p>}
              {errorMessage && <p className="error">{errorMessage}</p>}
              <MovieList movies={searchResults} />
            </>
          }
        />
        <Box
          element={
            <>
              <WatchedListSummary watched={watched} />
              {/* TODO: Remove it just for testing */}
              <div className="rating">
                <StarRating maxRating={10} />
                <button className="btn-add">+ Add list</button>
              </div>
              <MovieList movies={watched} />
            </>
          }
        />
      </Main>
    </>
  );
}

// Page Components
function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopCorn</h1>
      </div>
      {children}
    </nav>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function NumberOfSearchResult({ numOfResults }) {
  return (
    <p className="num-results">
      Found <strong>{numOfResults}</strong> results
    </p>
  );
}

function Box({ element }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && element}
    </div>
  );
}

function WatchedListSummary({ watched }) {
  const avgImdbRating = calcAvg(watched.map((movie) => movie.imdbRating));
  const avgUserRating = calcAvg(watched.map((movie) => movie.userRating));
  const avgRuntime = calcAvg(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

// Reusable components
function SearchBar({ placeholder, onSearch }) {
  const [searchInp, setSearchInp] = useState("");

  // debouncing effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchInp);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInp, onSearch]);

  return (
    <input
      type="search"
      placeholder={placeholder}
      className="search"
      onChange={(e) => setSearchInp(e.target.value)}
    />
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <MovieListItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function MovieListItem({ movie }) {
  return (
    <li>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
    </li>
  );
}

function ToggleButton({ isOpen, onClick }) {
  return (
    <button onClick={onClick} className="btn-toggle">
      {isOpen ? "-" : "+"}
    </button>
  );
}

//  utils
function calcAvg(vals) {
  return vals.reduce((acc, curr, _, arr) => acc + curr / arr.length, 0);
}

function fetchMovies({ searchQuery }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = searchQuery
        ? tempMovieData.filter((movies) =>
            movies.title
              .toLowerCase()
              .startsWith(searchQuery.trim().toLowerCase())
          )
        : tempMovieData;

      resolve(response);
    }, 500);
  });
}
