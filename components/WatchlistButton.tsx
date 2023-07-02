import { AiOutlineEye, AiOutlineCheck } from "react-icons/ai";
import React, { useCallback, useMemo, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useWatchlist from "@/hooks/useWatchlist";
import axios from "axios";

interface WatchlistButtonProps {
  movieId: string;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ movieId }) => {
  const { mutate: mutateWatchlist } = useWatchlist();
  const { data: currentUser, mutate } = useCurrentUser();

  const inWatchlist = useMemo(() => {
    const list = currentUser?.watchlistIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleWatchlist = useCallback(async () => {
    const url = inWatchlist ? "/api/unWatchItem" : "/api/watchItem";
    const response = await axios.post(url, { movieId });

    const updatedWatchlist = response?.data?.watchlistIds;

    mutate({
      ...currentUser,
      watchlistIds: updatedWatchlist,
    });
    mutateWatchlist();
  }, [movieId, inWatchlist, currentUser, mutate, mutateWatchlist]);

  const Icon = inWatchlist ? AiOutlineCheck : AiOutlineEye;

  return (
    <main
      onClick={toggleWatchlist}
      className="  
    cursor-pointer
    group/item
    w-6
    h-6
    lg:w-8
    lg:h-8
    border-white
    border-2
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:border-neutral-300"
    >
      <Icon className="text-white self-center" size={25} />
    </main>
  );
};
export default WatchlistButton;
