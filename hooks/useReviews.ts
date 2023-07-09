import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useReviews = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/myReviews", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useReviews;
