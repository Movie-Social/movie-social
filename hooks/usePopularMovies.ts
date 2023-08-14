import useSWR from "swr";
import tmdbFetcher from "@/lib/tmdbFetcher";

const usePopularMovies = () => {
  const { data, error, isLoading } = useSWR(tmdbFetcher);

  return { data, error, isLoading };
};

export default usePopularMovies;
