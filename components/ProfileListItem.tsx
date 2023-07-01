import useMovie from "@/hooks/useMovie";

interface ListItemProps {
  movieId: string;
}
const ProfileListItem: React.FC<ListItemProps> = ({ movieId }) => {
  const { data } = useMovie(movieId as string);

  return (
    <main className="">
      <img src={data?.poster} alt={`${data?.title}'s official data poster`} />
      <h2>{data?.title}</h2>
    </main>
  );
};
export default ProfileListItem;
