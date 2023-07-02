import useMovie from "@/hooks/useMovie";
import Image from "next/image";
import { useRouter } from "next/router";
interface ListItemProps {
  movieId: string;
}
const ProfileListItem: React.FC<ListItemProps> = ({ movieId }) => {
  const { data } = useMovie(movieId as string);
  const router = useRouter();
  return (
    <main className="w-full h-full">
      <Image
        onClick={() => router.push(`/movie/${data?.movieId}`)}
        className="cursor-pointer transition hover:opacity-70"
        width={150}
        height={50}
        src={data?.poster}
        alt={`${data?.title}'s official movie poster`}
      />
      <h2
        className="cursor-pointer transition hover:text-yellow-300"
        onClick={() => router.push(`/movie/${data?.movieId}`)}
      >
        {data?.title}
      </h2>
    </main>
  );
};
export default ProfileListItem;
