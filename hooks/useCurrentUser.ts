//using SWR in the place of redux or other gsm techniques
//instead SWR will store the currentuser locally that way it is not consistently fetching for the current user
import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
