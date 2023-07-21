import logger from "@/lib/logger";

const tmdbMovieFetcher = async (searchWords: any) => {
  try {
    console.log(
      searchWords.toLowercase().split(" ").join("%20"),
      "SEARCH WRDS"
    );
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchWords}?api_key=${process.env.NEXT_PUBLIC_TMDB}`
    );
    return response.json();
  } catch (error) {
    logger.error(error);
  }
};
export default tmdbMovieFetcher;
