import { useEffect, useState } from "react";
//* Without this line of code I will have a hydration error. Why?
import dynamic from "next/dynamic";
import Image from "next/image";
import RestfulMovieList from "./RestfulMovieList";
import useAllHero from "@/hooks/useAllHero";
import "react-slideshow-image/dist/styles.css";
import { useRouter } from "next/router";
import tmdbMovieFetcher from "@/lib/tmdbMovieFetcher";

const Hero = () => {
  const allHero = useAllHero();
  const router = useRouter();
  const heroOptions = allHero?.data;
  const [movie, setMovie] = useState();

  useEffect(() => {
    const fetchTMDBLists = async () => {
      const fetchedMovie = await tmdbMovieFetcher(heroOptions?.title);
      setMovie(fetchedMovie?.results[0]);
    };
    fetchTMDBLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroOptions]);

  return (
    <main className="relative lg:w-full lg:h-[80vh] self-center opacity-50 border lg:rounded-lg border-blue-700">
      <div className="relative h-56 lg:h-[100vh] w-full">
        <Image
          onClick={() => router.push(`/movie/tmdb/${movie?.id}`)}
          src={heroOptions?.poster}
          fill
          priority
          alt={heroOptions?.caption}
          className="cursor-pointer border-2 border-red-200"
        />
        <div className="absolute inset-x-1/4 top-5 text-center z-10 md:text-5xl text-2xl bold text-gray-200">
          <h2>{heroOptions?.caption.split("Scene from the movie ")[1]}</h2>
        </div>
        <div className="w-full absolute bottom-1 text-center z-10 border border-orange-500">
          {/* Should make new component? That doesnt have slide effect  */}
          {/* <RestfulMovieList title="Now Playing" /> */}
        </div>
      </div>
    </main>
  );
};
//* Without this line of code I will have a hydration error. Why?
export default dynamic(() => Promise.resolve(Hero), { ssr: false });
