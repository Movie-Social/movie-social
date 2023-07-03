import logger from "./logger";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB || "",
  },
};
const tmdbFetcher = async () => {
  const popularMovies = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .catch((error) => logger.info(error));
  logger.fatal(popularMovies, "test TMDB");
};
export default tmdbFetcher;
