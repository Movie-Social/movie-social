import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieByTitle = (title: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/movieByTitle/${title}`,
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
  };
};
export default useMovieByTitle;
