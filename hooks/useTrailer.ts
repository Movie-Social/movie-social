import useSWR from "swr";
import trailerFetcher from "@/lib/trailerFetcher";

const useTrailer = (tmdbId?: string) => {
  const { data, error, isLoading } = useSWR(trailerFetcher);

  return { data, error, isLoading };
};

export default useTrailer;
