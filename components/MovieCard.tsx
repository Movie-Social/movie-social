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
    <main
      className="flex flex-col items-center justify-center content-center text-center group bg-zinc-900 relative mx-1"
      // onClick={handleOpenModal}
    >
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
          self-center         
          transition
          duration
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
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
      opacity-0
      absolute
      transition
      duration-300
      z-10
      invisible
      sm:visible
      delay-200
      scale-0
      group-hover:scale-100
      group-hover:-translate-y-[2vw]
      group-hover:opacity-100
      "
      >
        <Image
          className="
        cursor-pointer
        transition
        duration
        shadow-xl
        rounded-t-md
        "
          width={200}
          height={200}
          src={data.poster}
          alt="thumbnail"
        />
        <section
          className="
        z-10
        bg-zinc-800
        p-2
        lg:p-4
        absolute
        w-full
        transition
        shadow-md
        rounded-b-md
        "
        >
          <div
            className="
flex flex-row items-center
"
          >
            {/* <FavoriteButton movieId={data?.id} />
            <WatchlistButton movieId={data?.id} /> */}
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

            {/* <FavoriteButton movieId={data?.id} />
            <WatchlistButton movieId={data?.id} /> */}
          </div>
          {/* <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p> */}
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.title}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              Rating: {data.score}
            </p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <button className="text-white text-[10px] lg:text-sm">
              {data.categories[0]}
            </button>
            <button className="text-white text-[10px] lg:text-sm">
              {data.categories[1]}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};
export default MovieCard;
