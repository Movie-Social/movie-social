import { useRouter } from "next/router";
interface RestfulMovieCardProps {
  data: Record<string, any>;
}

const RestfulMovieCard: React.FC<RestfulMovieCardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center content-center text-center">
      <div className="flex justify-center">
        <img
          className="self-center"
          onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
          alt={`${data.title}'s official movie poster"`}
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
          width={200}
          height={200}
        />
      </div>
      <h2 className="text-white">{data?.title}</h2>
      <h2>{data?.popularity}</h2>
    </main>
  );
};
export default RestfulMovieCard;
