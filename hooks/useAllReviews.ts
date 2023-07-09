import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useAllReviews = () => {
  const { data, error, isLoading } = useSWR("/api/allReviews", fetcher, {
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
export default useAllReviews;
