import useSWR from "swr";
import trailerFetcher from "@/lib/trailerFetcher";

const useTrailer = (tmdbId?: string) => {
  const { data, error, isLoading } = useSWR(
    tmdbId
      ? `https://api.themoviedb.org/3/movie/${tmdbId}?language=en-US&page=1`
      : null,
    trailerFetcher
  );

  return { data, error, isLoading };
};

export default useTrailer;
