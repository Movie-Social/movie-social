import { useRouter } from "next/router";
interface RestfulMovieCardProps {
  data: Record<string, any>;
}

const RestfulMovieCard: React.FC<RestfulMovieCardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <main>
      <img
        onClick={() => router.push(`/movie/tmdb/${data?.id}`)}
        alt={`${data.title}'s official movie poster"`}
        src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
        fill
      />
      <h2>{data?.title}</h2>
      <h2>{data?.popularity}</h2>
    </main>
  );
};
export default RestfulMovieCard;
