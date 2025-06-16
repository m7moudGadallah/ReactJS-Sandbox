export class WatchedMoviesApi {
  constructor() {
    this.storageKey = "watchedMovies";
  }

  // Get all watched movies
  get() {
    const movies = localStorage.getItem(this.storageKey);
    return movies ? JSON.parse(movies) : [];
  }

  // Get Movie by ImdbId
  getById(imdbID) {
    const movies = this.get();
    return movies.find((movie) => movie.imdbID === imdbID) || null;
  }

  // Upsert a movie (insert or update)
  upsert(movie) {
    const movies = this.get();
    const index = movies.findIndex((m) => m.imdbID === movie.imdbID);

    if (index !== -1) {
      movies[index] = { ...movies[index], ...movie }; // update
    } else {
      movies.push(movie); // insert
    }

    localStorage.setItem(this.storageKey, JSON.stringify(movies));
  }

  // Delete a movie by IMDb ID
  delete(imdbID) {
    const movies = this.get();
    const updatedMovies = movies.filter((movie) => movie.imdbID !== imdbID);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedMovies));
  }
}

const watchedMoviesApi = new WatchedMoviesApi();
export default watchedMoviesApi;
