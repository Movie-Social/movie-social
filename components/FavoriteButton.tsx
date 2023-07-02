import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { MdFavorite } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    const url = isFavorite ? "/api/unfavorite" : "/api/favorite";
    const response = await axios.post(url, { movieId });

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : MdFavorite;

  return (
    <main
      onClick={toggleFavorites}
      className="cursor-pointer
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
  hover:border-neutral-300
  "
    >
      {<Icon className="text-white self-center" size={25} />}
    </main>
  );
};

export default FavoriteButton;
