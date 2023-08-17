import { useRouter } from "next/router";
import Image from "next/image";
import useMovie from "@/hooks/useMovie";
import loady from "../public/images/imgLoad.gif";
import { useEffect, useState } from "react";
import tmdbMovieFetcher from "@/lib/tmdbMovieFetcher";
import { tmdbProps } from "@/pages/movie/tmdb/[restfulDetails]";
interface ListItemProps {
  movieId: string;
  faves?: any;
}
const ProfileListItem: React.FC<ListItemProps> = ({ movieId, faves }) => {
  const { data, isLoading } = useMovie(movieId as string);
  const router = useRouter();
  const [tmdb, setTmdb] = useState<tmdbProps>();
  useEffect(() => {
    const fetchTmdb = async () => {
      const tmdbDetails = await tmdbMovieFetcher(faves);
      const details = tmdbDetails?.results
        .filter((movie: any) => movie.original_language === "en")
        .sort((a: any, b: any) => b.popularity - a.popularity)[0];
      setTmdb(details);
    };
    fetchTmdb();
  }, [faves]);

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      {isLoading ? (
        <Image
          className=" transition hover:opacity-70"
          width={150}
          height={50}
          src={loady}
          alt={"loading gif"}
        />
      ) : (
        <button className="accessibilityScore">
          <Image
            priority
            onClick={() => router.push(`/movie/tmdb/${tmdb?.id}`)}
            className="cursor-pointer h-full transition hover:opacity-70 rounded-md"
            width={150}
            height={50}
            src={`https://image.tmdb.org/t/p/original/${tmdb?.poster_path}`}
            alt={`${tmdb?.title}'s official movie poster`}
          />
        </button>
      )}
      <h2
        className="cursor-pointer transition hover:text-yellow-300"
        onClick={() => router.push(`/movie/tmdb/${tmdb?.id}`)}
      >
        {tmdb?.title}
      </h2>
    </main>
  );
};
export default ProfileListItem;
