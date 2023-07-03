import logger from "./logger";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDB || "",
  },
};
const tmdbFetcher = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    return response.json();
  } catch (error) {
    logger.error(error);
  }
};
export default tmdbFetcher;
