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
    <main
      className={`relative w-[95%] mx-20 h-[25vh] text-center bg-transparent border border-purple-500`}
    >
      {!data?.poster_path ? (
        <Image
          src={loady}
          alt="gif to show the intended image is loading"
          fill
          className="absolute"
        />
      ) : (
        <Image
          onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
          alt={`${data.title}'s official movie poster"`}
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
          fill
          className="absolute"
        />
      )}
      <section></section>
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
