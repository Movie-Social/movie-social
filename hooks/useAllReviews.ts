import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useAllReviews = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/allReviews",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useAllReviews;
