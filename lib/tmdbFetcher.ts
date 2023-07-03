import logger from "./logger";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB || "",
  },
};
const tmdbFetcher = async () => {
  const test = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  ).then((response) => response.json());
  logger.fatal(test, "test TMDB");
};
export default tmdbFetcher;
