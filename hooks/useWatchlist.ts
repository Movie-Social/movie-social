import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useWatchlist = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/watchlist", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useWatchlist;
