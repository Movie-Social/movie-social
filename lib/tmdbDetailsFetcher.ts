import logger from "@/lib/logger";

const tmdbDetailsFetcher = async (movieId: any) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB}`
    );
    return response.json();
  } catch (error) {
    logger.error(error);
  }
};
export default tmdbDetailsFetcher;
