import { useRouter } from "next/router";
import Image from "next/image";
import useMovie from "@/hooks/useMovie";
import loady from "../public/images/imgLoad.gif";
interface ListItemProps {
  movieId: string;
}
const ProfileListItem: React.FC<ListItemProps> = ({ movieId }) => {
  const { data, isLoading } = useMovie(movieId as string);
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      {isLoading ? (
        <Image
          className=" transition hover:opacity-70"
          width={150}
          height={50}
          src={loady}
          alt={"loading gif"}
        />
      ) : (
        <Image
          priority
          onClick={() => router.push(`/movie/${data?.movieId}`)}
          className="h-full cursor-pointer transition hover:opacity-70"
          width={150}
          height={50}
          src={data?.poster}
          alt={`${data?.title}'s official movie poster`}
        />
      )}
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
