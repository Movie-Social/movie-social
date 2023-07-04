import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";
interface RestfulMovieCardProps {
  data: Record<string, any>;
}

const RestfulMovieCard: React.FC<RestfulMovieCardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center content-center text-center cursor-pointer group bg-zinc-900 relative">
      {/* <div className="flex justify-center"> */}
      <img
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
      {/* </div> */}
      <div
        className="
      opacity-0
      absolute
      top-0
      transition
      duration-300
      z-10
      invisible
      sm:visible
      delay-200
      w-full
      scale-0
      group-hover:scale-110
      group-hover:-translate-y-[6vw]
      group-hover:opacity-100
      "
      >
        <img
          className="
        cursor-pointer
        object-fill
        transition
        duration
        shadow-xl
        rounded-t-md
        w-full
        h-[20vw]
        "
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
flex flex-row items-center gap-3
"
          >
            <div
              // onClick={() => router.push(`/watch/${data?.id}`)}
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
            </div>

            {/* <FavoriteButton movieId={data?.id} />
            <WatchlistButton movieId={data?.id} /> */}
          </div>
          {/* <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p> */}
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data?.title}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {/* Rating: {data.score} */}
            </p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            {/* <button className="text-white text-[10px] lg:text-sm">
              {data.categories[0]}
            </button>
            <button className="text-white text-[10px] lg:text-sm">
              {data.categories[1]}
            </button> */}
          </div>
        </section>
      </div>
      {/* <h2 className="text-white">{data?.title}</h2>
      <h2>{data?.popularity}</h2> */}
    </main>
  );
};
export default RestfulMovieCard;
