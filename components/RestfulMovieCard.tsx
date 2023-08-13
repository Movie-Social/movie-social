import { useRouter } from "next/router";
import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";
import Image from "next/image";
import loady from "../public/images/imgLoad.gif";
import useRestfulInfoModal from "@/hooks/useRestfulInfoModal";
interface RestfulMovieCardProps {
  data: Record<string, any>;
}

const RestfulMovieCard: React.FC<RestfulMovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useRestfulInfoModal();
  return (
    <main
      className={`relative group w-[95%] md:mx-20 h-[25vh] text-center rounded-md bg-black overflow-visible transition duration-500 hover:scale-125 md:hover:-translate-y-[2vw] lg:hover:-translate-y-[1vw]`}
    >
      <section className="z-10">
        {!data?.poster_path ? (
          <Image
            src={loady}
            alt="gif to show the intended image is loading"
            fill
            className="rounded-md"
          />
        ) : (
          <Image
            onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
            alt={`${data.title}'s official movie poster"`}
            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
            fill
            className="cursor-pointer rounded-md transition duration-500 group-hover:opacity-0"
          />
        )}
      </section>
      <section className="relative flex flex-col justify-around h-full w-full rounded-md opacity-0 transition duration-500 group-hover:opacity-100">
        <Image
          onClick={() => openModal(data?.id)}
          alt={`${data.title}'s official movie poster"`}
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
          width={200}
          height={200}
          className="absolute w-full h-full rounded-md opacity-50 cursor-pointer"
        />
        <div className="absolute bottom-5 left-1 flex flex-col items-start">
          <h2
            className="cursor-pointer text-white mx-2 text-sm lg:text-lg"
            onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
          >
            {data?.title}
          </h2>
          <p className="text-white mx-2 text-sm lg:text-md">
            {data?.release_date.split("-")[0]}
          </p>
          <div className="flex flex-row justify-around">
            <FavoriteButton movieTitle={data?.title} />
            <WatchlistButton movieTitle={data?.title} />
          </div>
        </div>
      </section>
    </main>
  );
};
export default RestfulMovieCard;
