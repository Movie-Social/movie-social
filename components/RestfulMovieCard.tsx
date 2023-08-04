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
  console.log(data);
  return (
    <main
      className={`relative w-[95%] mx-20 h-[25vh] text-center bg-transparent hover:opacity-30 border border-purple-500 z-0`}
    >
      <section className="">
        {!data?.poster_path ? (
          <Image
            src={loady}
            alt="gif to show the intended image is loading"
            fill
          />
        ) : (
          <Image
            onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
            alt={`${data.title}'s official movie poster"`}
            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
            fill
            className="transition duration-500"
          />
        )}
      </section>
      <section className="opacity-0  flex flex-col justify-around h-full w-full border border-orange-300 hover:opacity-100">
        <h2 className="text-white text-center font-bold text-sm lg:text-lg">
          {data?.title}
        </h2>
        <div className="flex flex-row justify-around">
          <FavoriteButton movieId={data?.id.toString()} />
          <WatchlistButton movieId={data?.id} />
        </div>
      </section>
    </main>
  );
  // return (
  //   <main className="relative group flex flex-col items-center justify-center content-center mx-1 text-center bg-transparent">
  //     {/* <div className="flex justify-center"> */}
  //     {!data?.poster_path ? (
  //       <Image
  //         src={loady}
  //         alt="gif to show the intended image is loading"
  //         width={200}
  //         height={200}
  //       />
  //     ) : (
  //       <Image
  //         className="
  //         self-center
  //         shadow-xl
  //         rounded-md
  //         group-hover:opacity-90
  //         sm:group-hover:opacity-0
  //         transition
  //         duration
  //         delay-300
  //         width-auto
  //         height-auto
  //         "
  //         onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
  //         alt={`${data.title}'s official movie poster"`}
  //         src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
  //         width={200}
  //         height={200}
  //       />
  //     )}
  //     <div
  //       className="
  //       absolute
  //       z-10
  //       opacity-0
  //       sm:visible
  //       invisible
  //       group-hover:scale-100
  //       group-hover:-translate-y-[-4vw]
  //       group-hover:opacity-100
  //       scale-0
  //       duration-300
  //       delay-200
  //       transition
  //       border
  //       h-[45vw]
  //       w-full
  //     "
  //     >
  //       <Image
  //         onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
  //         className="
  //       cursor-pointer
  //       transition
  //       duration
  //       shadow-xl
  //       rounded-t-md
  //       w-full
  //       h-[60%]
  //       "
  //         width={200}
  //         height={200}
  //         src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
  //         alt="thumbnail"
  //       />
  //       <section
  //         className="
  //       z-10
  //       absolute
  //       w-full
  //       h-[40%]
  //       shadow-md
  //       rounded-b-md
  //       p-2
  //       lg:p-4
  //       bg-zinc-800
  //       transition
  //       "
  //       >
  //         <div
  //           className="
  //           flex flex-row items-center"
  //         >
  //           <FavoriteButton movieId={data?.id} />
  //           <WatchlistButton movieId={data?.id} />
  //         </div>
  //         <div className="flex flex-row items-center">
  //           <p
  //             onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
  //             className="cursor-pointer text-white text-center text-sm lg:text-sm"
  //           >
  //             {data?.title}
  //           </p>
  //         </div>
  //       </section>
  //     </div>
  //   </main>
  // );
};
export default RestfulMovieCard;
