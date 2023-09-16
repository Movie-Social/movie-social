const tmdbDetailsFetcher = async (movieId: any) => {
  if (!movieId) {
    console.clear();
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB}`
    );
    return response.json();
  } catch (error) {
    console.clear();
  }
};
export default tmdbDetailsFetcher;
