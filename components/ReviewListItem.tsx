import Image from "next/image";
import { useRouter } from "next/router";
interface ReviewListItemProps {
  data: Record<string, any>;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <main className="border-b-2 border-yellow-300 w-[95%] my-3 p-3">
        <h2
          className="cursor-pointer transtion hover:text-yellow-300"
          onClick={() => router.push(`/movie/${data.movieId}`)}
        >
          {data?.title}
        </h2>
        <section className="flex flex-row">
          <Image
            className="cursor-pointer transition hover:opacity-70"
            onClick={() => router.push(`/movie/${data.movieId}`)}
            src={data.poster}
            alt={`${data.title}'s official 
          movie poster`}
            width={130}
            height={50}
          />
          <p className="mx-3">{data.review}</p>
        </section>
      </main>
    </div>
  );
};
export default ReviewListItem;
