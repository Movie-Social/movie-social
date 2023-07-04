import useSWR from "swr";
import tmdbFetcher from "@/lib/tmdbFetcher";

//may need to pass in arg if i make the fetch call more dynamic
const usePopularMovies = () => {
  const { data, error, isLoading } = useSWR(tmdbFetcher);

  return { data, error, isLoading };
};

export default usePopularMovies;
