import { BsFillPlayFill, BsFillInfoCircleFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
// import useInfoModal from "@/hooks/useInfoModal";
import WatchlistButton from "./WatchlistButton";
import Image from "next/image";
import loady from "../public/images/imgLoad.gif";
import tmdbDetailsFetcher from "@/lib/tmdbDetailsFetcher";
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
  // const { openModal } = useInfoModal();
  // const handleOpenModal = useCallback(() => {
  //   openModal(data?.id);
  // }, [openModal, data?.id]);
  return (
    <main className="relative group flex flex-col items-center justify-center content-center mx-1 text-center h-full bg-zinc-900">
      {!data?.poster ? (
        <Image
          src={loady}
          alt="gif to show the intended image is loading"
          width={200}
          height={200}
        />
      ) : (
        <Image
          className="
          h-full  
          self-center       
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          transition
          duration
          delay-300
        "
          width={200}
          height={200}
          src={data.poster}
          alt={`${data.title}'s official movie poster"`}
          onClick={() => router.push(`/movie/${data?.id}`)}
        />
      )}
      <div
        className="
        absolute
        z-10
        opacity-0
        sm:visible
        invisible
        group-hover:scale-100
        group-hover:-translate-y-[-4vw]
        group-hover:opacity-100
        scale-0
        duration-300
        delay-200
        transition
        border
        h-[45vw]
        w-full
        border-purple-600
      "
      >
        <Image
          onClick={() => router.push(`/movie/${data?.id}`)}
          className="
          cursor-pointer
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-[60%]
        "
          width={200}
          height={200}
          src={data.poster}
          alt="thumbnail"
        />
        <section
          className="
          z-10
          absolute
          w-full
          h-[40%]
          shadow-md
          rounded-b-md
          p-2
          lg:p-4
          bg-zinc-800
          transition
        "
        >
          <div
            className="
flex flex-row items-center
"
          >
            <FavoriteButton movieId={data?.id} />
            <WatchlistButton movieId={data?.id} />
          </div>
          {/* <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="
            cursor-pointer
            w-6
            h-6
            lg:w-8
            lg:h-8
            bg-white
            rounded-full
            flex
            justify-center
            items-center
            content-center
            transition
            hover:bg-neutral-300
            "
            >
              <BsFillPlayFill size={25} />
            </div> */}

          {/* <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p> */}
          <div
            className="flex flex-row items-center"
            onClick={() => router.push(`/movie/${data?.id}`)}
          >
            <p className="cursor-pointer text-white text-center text-sm lg:text-sm">
              {data.title}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};
export default MovieCard;
