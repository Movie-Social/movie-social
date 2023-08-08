import { AiOutlineEye, AiOutlineCheck } from "react-icons/ai";
import React, { useCallback, useMemo, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useWatchlist from "@/hooks/useWatchlist";
import axios from "axios";

interface WatchlistButtonProps {
  movieTitle: string;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ movieTitle }) => {
  const { mutate: mutateWatchlist } = useWatchlist();
  const { data: currentUser, mutate } = useCurrentUser();
  const inWatchlist = useMemo(() => {
    const list = currentUser?.watchlistTitles || [];

    return list.includes(movieTitle);
  }, [currentUser, movieTitle]);

  const toggleWatchlist = useCallback(async () => {
    const url = inWatchlist ? "/api/unWatchItem" : "/api/watchItem";
    const response = await axios.post(url, { movieTitle });
    const updatedWatchlist = response?.data?.watchlistTitles;

    mutate({
      ...currentUser,
      watchlistTitles: updatedWatchlist,
    });

    mutateWatchlist();
  }, [movieTitle, inWatchlist, currentUser, mutate, mutateWatchlist]);

  const Icon = inWatchlist ? AiOutlineCheck : AiOutlineEye;

  return (
    <main
      onClick={toggleWatchlist}
      className="  
    cursor-pointer
    group/item
    w-6
    h-6
    lg:w-7
    lg:h-7
    mx-1
    border-white
    border-2
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:border-neutral-300"
    >
      <Icon className="text-white self-center" size={20} />
    </main>
  );
};
export default WatchlistButton;
