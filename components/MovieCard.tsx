import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useInfoModal from "@/hooks/useInfoModal";
import WatchlistButton from "./WatchlistButton";
import Image from "next/image";
import loady from "../public/images/imgLoad.gif";
import tmdbMovieFetcher from "@/lib/tmdbMovieFetcher";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const [tmdb, setTmdb] = useState("");
  useEffect(() => {
    const fetchTmdb = async () => {
      const tmdbDetails = await tmdbMovieFetcher(data?.title);
      setTmdb(tmdbDetails);
    };
    fetchTmdb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { openModal } = useInfoModal();
  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <main
      className={`relative group w-[95%] md:mx-20 h-[25vh] text-center rounded-md bg-black overflow-visible transition duration-500 hover:scale-125 md:hover:-translate-y-[2vw] lg:hover:-translate-y-[1vw]`}
    >
      <section className="z-10">
        {!data?.poster ? (
          <Image
            src={loady}
            alt="gif to show the intended image is loading"
            fill
            className="rounded-md"
          />
        ) : (
          <Image
            onClick={() => router.push(`/movie/${data?.id}`)}
            alt={`${data.title}'s official movie poster"`}
            src={data.poster}
            fill
            className="cursor-pointer rounded-md transition duration-500 group-hover:opacity-0"
          />
        )}
      </section>
      <section className="relative flex flex-col justify-around h-full w-full rounded-md opacity-0 transition duration-500 group-hover:opacity-100">
        <Image
          onClick={() => openModal(data?.id)}
          className="absolute w-full h-full rounded-md opacity-50 cursor-pointer"
          width={200}
          height={200}
          src={data.poster}
          alt={`${data?.title}'s official movie poster`}
        />
        <div className="absolute bottom-5 left-1 flex flex-col items-start">
          <h2
            className="cursor-pointer text-white mx-2 mb-2 text-sm lg:text-lg"
            onClick={() => openModal(data?.id)}
          >
            {data?.title}
          </h2>
          <div className="flex flex-row justify-around">
            <FavoriteButton movieTitle={data?.title} />
            <WatchlistButton movieTitle={data?.title} />
          </div>
        </div>
      </section>
    </main>
  );
};
export default MovieCard;
