import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { MdFavorite } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
interface FavoriteButtonProps {
  movieTitle: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieTitle }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteTitles || [];

    return list.includes(movieTitle);
  }, [currentUser, movieTitle]);

  const toggleFavorites = useCallback(async () => {
    const url = isFavorite ? "/api/unfavorite" : "/api/favorite";
    const response = await axios.post(url, { movieTitle });
    const updatedFavoriteTitles = response?.data?.favoriteTitles;

    mutate({
      ...currentUser,
      favoriteTitles: updatedFavoriteTitles,
    });

    mutateFavorites();
  }, [movieTitle, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : MdFavorite;

  return (
    <main
      onClick={toggleFavorites}
      className="cursor-pointer
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
  hover:border-neutral-300
  "
    >
      {<Icon className="text-white self-center" size={20} />}
    </main>
  );
};

export default FavoriteButton;
