import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";
import Image from "next/image";
import loady from "../public/images/imgLoad.gif";
interface RestfulMovieCardProps {
  data: Record<string, any>;
}

const RestfulMovieCard: React.FC<RestfulMovieCardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center content-center text-center group bg-zinc-900 relative">
      {/* <div className="flex justify-center"> */}
      {!data?.poster_path ? (
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
          delay-300"
          onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
          alt={`${data.title}'s official movie poster"`}
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
          width={200}
          height={200}
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
          onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
          className="
        cursor-pointer
        transition
        duration
        shadow-xl
        rounded-t-md
        border 
        border-blue-300
        "
          width={200}
          height={200}
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
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
          </div>
          <div className="flex flex-row items-center">
            <p
              onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
              className="cursor-pointer text-white text-[10px] lg:text-sm"
            >
              {data?.title}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};
export default RestfulMovieCard;
