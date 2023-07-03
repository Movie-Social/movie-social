interface RestfulMovieCardProps {
  data: Record<string, any>;
}
const RestfulMovieCard: React.FC<RestfulMovieCardProps> = ({ data }) => {
  console.log(data, "<<");
  return (
    <main>
      <h2>{data?.title}</h2>
      <h2>{data?.popularity}</h2>
    </main>
  );
};
export default RestfulMovieCard;
