import useSWR from "swr";
import tmdbFetcher from "@/lib/tmdbFetcher";

const useTMDB = (category?: string) => {
  const { data, error, isLoading } = useSWR(
    category
      ? `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
      : null,
    tmdbFetcher
  );

  return { data, error, isLoading };
};

export default useTMDB;
