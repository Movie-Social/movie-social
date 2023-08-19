const trailerFetcher = async (tmdbId: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export default trailerFetcher;
