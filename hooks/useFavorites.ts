//A hook for data fetching client/user specific info that is irrelevant to SEO
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/favorites", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useFavorites;
