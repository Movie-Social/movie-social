const tmdbMovieFetcher = async (searchWords: any) => {
  if (!searchWords) {
    return null;
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchWords
        .split(" ")
        .join("%20")}&api_key=${process.env.NEXT_PUBLIC_TMDB}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export default tmdbMovieFetcher;
