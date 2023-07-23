import { useRouter } from "next/router";
import Image from "next/image";
import useMovieByTitle from "@/hooks/useMovieByTitle";
import loady from "../public/images/imgLoad.gif";
interface ReviewListItemProps {
  data: Record<string, any>;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({ data }) => {
  const router = useRouter();
  const movieMovie = useMovieByTitle(data.title);
  const isLoading = useMovieByTitle(data.title);
  return (
    <main className="flex justify-center">
      <section className="border-b-2 border-yellow-300 w-[95%] my-3 p-3">
        <h2
          className="cursor-pointer transtion hover:text-yellow-300"
          onClick={() => router.push(`/movie/${movieMovie.data}`)}
        >
          {data?.title}
        </h2>
        <div className="flex flex-row">
          {isLoading.isLoading ? (
            <Image
              src={loady}
              alt="Loading gif animation"
              width={130}
              height={50}
            />
          ) : (
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
          )}
          <p className="mx-3">{data.review}</p>
        </div>
      </section>
    </main>
  );
};
export default ReviewListItem;
