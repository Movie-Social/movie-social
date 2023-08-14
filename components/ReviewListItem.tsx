import { useRouter } from "next/router";
import Image from "next/image";
import useMovieByTitle from "@/hooks/useMovieByTitle";
import { useEffect, useState } from "react";
import { tmdbProps } from "@/pages/movie/tmdb/[restfulDetails]";
import tmdbMovieFetcher from "@/lib/tmdbMovieFetcher";
interface ReviewListItemProps {
  data: Record<string, any>;
}
const ReviewListItem: React.FC<ReviewListItemProps> = ({ data }) => {
  const router = useRouter();
  const movieMovie = useMovieByTitle(data.title);
  const [tmdb, setTmdb] = useState<tmdbProps>();

  useEffect(() => {
    const fetchTmdb = async () => {
      data?.title;
      const tmdbDetails = await tmdbMovieFetcher(data?.title);
      const details = tmdbDetails?.results
        .filter((movie: any) => movie.original_language === "en")
        .sort((a: any, b: any) => b.popularity - a.popularity)[0];
      setTmdb(details);
    };
    fetchTmdb();
  }, [data?.title]);
  return (
    <main className="flex justify-center ">
      {movieMovie ? (
        <section className="w-full my-3 p-3 border-b-2 border-yellow-300 border-opacity-30">
          {movieMovie.data ? (
            <h2
              className="cursor-pointer text-xl lg:text-2xl mb-3 transtion hover:text-yellow-300"
              onClick={() => router.push(`/movie/${movieMovie.data}`)}
            >
              {data?.title}
            </h2>
          ) : (
            <h2
              onClick={() => router.push(`/movie/tmdb/${tmdb?.id}`)}
              className="cursor-pointer text-xl lg:text-2xl mb-3 transtion hover:text-yellow-300"
            >
              {data?.title}
            </h2>
          )}
          <div className="flex flex-row">
            {movieMovie.data ? (
              <Image
                priority
                className="cursor-pointer transition hover:opacity-70"
                onClick={() => router.push(`/movie/${movieMovie.data}`)}
                src={data.poster}
                alt={`${data.title}'s official 
          movie poster`}
                width={130}
                height={50}
              />
            ) : (
              <Image
                priority
                className="cursor-pointer transition hover:opacity-70 rounded-md"
                onClick={() => router.push(`/movie/tmdb/${tmdb?.id}`)}
                src={data.poster}
                alt={`${data.title}'s official 
        movie poster`}
                width={130}
                height={50}
              />
            )}
            <div className="flex flex-col justify-evenly">
              {data.review ? (
                <p className="mx-3">{data.review}</p>
              ) : (
                <p className="mx-3">No Review Submitted</p>
              )}
              {data.rating > 0 ? (
                <p className="mx-3">Rating: {data.rating}/5</p>
              ) : (
                <p className="mx-3">Rating: N/A</p>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
};
export default ReviewListItem;
