import useMovie from "@/hooks/useMovie";

interface MovieDetailsProps {
  movieId: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId }) => {
  //   change from hardcoded once I add parent ids
  const { data = {} } = useMovie(movieId);
  console.log(data, "<<<working?");
  return <main>We got action</main>;
};

export default MovieDetails;
