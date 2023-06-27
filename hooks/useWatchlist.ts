import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useWatchlist = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/watchlist", fetcher);
};
export default useWatchlist;
