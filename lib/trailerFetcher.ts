import logger from "./logger";

const trailerFetcher = async (tmdbId: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.NEXT_PUBLIC_TMDB}`
    );
    return response.json();
  } catch (error) {
    logger.error(error);
  }
};
export default trailerFetcher;
