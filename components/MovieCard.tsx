interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <main className="grouo bg-zinc-900 col-span relative h-[12vw]">
      <img src={data.poster} alt="Movie poster" />
    </main>
  );
};
export default MovieCard;
