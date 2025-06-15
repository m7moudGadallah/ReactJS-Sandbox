class MoviesApi {
  #apiKey;
  #baseUrl;

  constructor(apiKey) {
    this.#apiKey = apiKey;
    this.#baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;
  }

  async getMovies({ searchQuery }) {
    const res = await fetch(
      `${this.#baseUrl}&s=${searchQuery ? searchQuery : "Interstellar"}`
    );

    if (!res.ok) throw new Error("Something went wrong with fetching movies");

    const data = await res.json();

    if (data?.Response === "False") {
      throw new Error("Can't find any movies!");
    }

    const movies = data.Search;

    return movies.map((movie) => this.#movieMapping(movie));
  }

  async getMovieById(id) {
    const res = await fetch(`${this.#baseUrl}&i=${id}&plot=full`);

    if (!res.ok) throw new Error("Something went wrong with fetching movie");

    const data = await res.json();

    return this.#movieMapping(data);
  }

  #movieMapping(movie) {
    return {
      imdbID: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type,
      poster: movie.Poster,
      released: movie?.Released,
      runtime: movie?.Runtime,
      imdbRating: movie?.imdbRating,
      actors: movie?.Actors,
      director: movie?.Director,
      plot: movie?.Plot,
    };
  }
}

const omdbApikey = process.env?.REACT_APP_OMDB_API_KEY;
const moviesApi = new MoviesApi(omdbApikey);
export default moviesApi;
