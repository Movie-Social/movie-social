import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { MdDeleteForever } from "react-icons/md";
import useWatchlist from "@/hooks/useWatchlist";
interface ProfileRemoveButtonProps {
  movieTitle: string;
}

const ProfileRemoveButton: React.FC<ProfileRemoveButtonProps> = ({
  movieTitle,
}) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { mutate: mutateWatchlist } = useWatchlist();
  const { data: currentUser, mutate } = useCurrentUser();
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteTitles || [];

    return list.includes(movieTitle);
  }, [currentUser, movieTitle]);

  const toggleFavorites = useCallback(async () => {
    const url = isFavorite ? "/api/unfavorite" : "/api/unWatchItem";
    const response = await axios.post(url, { movieTitle });
    const updatedFavoriteTitles = response?.data?.favoriteTitles;
    const updatedWatchlist = response?.data?.watchlistTitles;

    mutate({
      ...currentUser,
      favoriteTitles: updatedFavoriteTitles,
      watchlistTitles: updatedWatchlist,
    });

    mutateFavorites();
    mutateWatchlist();
  }, [movieTitle, isFavorite, currentUser, mutate, mutateFavorites]);

  return (
    <main
      onClick={toggleFavorites}
      className="cursor-pointer
  group/item

  rounded-full
  flex
  justify-center
  items-center
  transition
  hover:border-yellow-300
  "
    >
      {<MdDeleteForever className="text-yellow-300 opacity-80" size={60} />}
    </main>
  );
};

export default ProfileRemoveButton;
