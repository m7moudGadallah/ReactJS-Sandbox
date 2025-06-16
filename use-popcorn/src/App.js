import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import moviesApi from "./apis/movies.api";
import watchedMoviesApi from "./apis/watched-movies.api";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [watched, setWatched] = useState(watchedMoviesApi.get());
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function upsertWatchedMovieHandler(movie) {
    watchedMoviesApi.upsert(movie);
    setWatched(watchedMoviesApi.get());
  }

  function deleteWatchedMovieHandler(imdbID) {
    watchedMoviesApi.delete(imdbID);
    setWatched(watchedMoviesApi.get());
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const results = await moviesApi.getMovies({ searchQuery });
        setSearchResults(results);
      } catch (err) {
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
              <MovieList
                movies={searchResults}
                selectMovieHandler={setSelectedMovieId}
                ItemComponent={MovieListItem}
              />
            </>
          }
        />
        <Box
          element={
            selectedMovieId ? (
              <MovieDetails
                movieId={selectedMovieId}
                onClose={() => setSelectedMovieId(null)}
                upsertWatchedMovieHandler={upsertWatchedMovieHandler}
              />
            ) : (
              <>
                <WatchedListSummary watched={watched} />
                <MovieList
                  movies={watched}
                  selectMovieHandler={setSelectedMovieId}
                  ItemComponent={(props) => (
                    <WatchedListMovieItem
                      {...props}
                      deleteMovieHandler={deleteWatchedMovieHandler}
                    />
                  )}
                />
              </>
            )
          }
        />
      </Main>
    </>
  );
}

function MovieDetails({ movieId, onClose, upsertWatchedMovieHandler }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isWatched, setIsWatched] = useState(true);

  useEffect(
    function () {
      document.title = `Movie | ${movie?.title ?? ""}`;
      return () =>
        (document.title = process.env?.REACT_APP_TITLE ?? "usePopCorn");
    },
    [movie]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let result = watchedMoviesApi.getById(movieId);
        setUserRating(result?.userRating ?? 0);

        if (!result) {
          setIsWatched(false);
          result = await moviesApi.getMovieById(movieId);
        }

        setMovie(result);
      } catch (err) {
        setErrorMessage(err.message);
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => setErrorMessage("");
  }, [movieId]);

  return (
    <div className="details">
      <button className="btn-back" onClick={onClose}>
        &larr;
      </button>
      <div>
        {isLoading && <p className="loader">Loading...</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {!isLoading && !errorMessage && (
          <>
            <header>
              <img src={movie.poster} alt={`Poster of ${movie.title}`} />
              <div className="details-overview">
                <h2>{movie.title}</h2>
                <p>
                  {movie.released} &bull; {movie.runtime}
                </p>
                <p>
                  <span>⭐</span> {movie.imdbRating} IMDb rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                <StarRating
                  maxRating={10}
                  initRating={userRating}
                  onRatingChange={setUserRating}
                />
                <button
                  className="btn-add"
                  onClick={() =>
                    upsertWatchedMovieHandler({
                      ...movie,
                      userRating,
                    })
                  }
                >
                  {isWatched ? "Update" : "+ Add list"}
                </button>
              </div>
              <p>
                <em>{movie.plot}</em>
              </p>
              <p>Starring {movie.actors}</p>
              <p>Directed by {movie.director}</p>
            </section>
          </>
        )}
      </div>
    </div>
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

function MovieList({ movies, selectMovieHandler, ItemComponent }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <ItemComponent
          key={movie.imdbID}
          movie={movie}
          clickHandler={() =>
            selectMovieHandler((selectedId) =>
              selectedId === movie.imdbID ? null : movie.imdbID
            )
          }
        />
      ))}
    </ul>
  );
}

function MovieListItem({ movie, clickHandler }) {
  return (
    <li onClick={clickHandler} style={{ cursor: "pointer" }}>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
    </li>
  );
}

function WatchedListMovieItem({ movie, clickHandler, deleteMovieHandler }) {
  return (
    <li onClick={clickHandler} style={{ cursor: "pointer" }}>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{movie?.userRating ?? 0}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{movie.runtime}</span>
        </p>
      </div>
      <button
        class="btn-delete"
        onClick={(e) => {
          e.stopPropagation();
          deleteMovieHandler(movie.imdbID);
        }}
      >
        X
      </button>
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
