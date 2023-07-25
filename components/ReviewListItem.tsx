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
  console.log(data, "<<<");
  return (
    <main className="flex justify-center">
      <section className="w-[95%] my-3 p-3 border-b-2 border-yellow-300 border-opacity-30">
        <h2
          className="cursor-pointer text-center mb-3 transtion hover:text-yellow-300"
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
    </main>
  );
};
export default ReviewListItem;
