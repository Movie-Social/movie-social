import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieByTitle = () => {
  const { data, error, isLoading } = useSWR("/api/movieByTitle", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};
export default useMovieByTitle;
