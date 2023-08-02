import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useAllHero = () => {
  const { data, error, isLoading } = useSWR("/api/allHero", fetcher, {
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
export default useAllHero;
