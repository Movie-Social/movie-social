import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useWatchlist from "@/hooks/useWatchlist";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BiUserCircle } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { useRouter } from "next/router";
import ProfileListItem from "@/components/ProfileListItem";

const MyProfile = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: faves } = useFavorites();
  const { data: watchlist } = useWatchlist();
  const router = useRouter();
  console.log(watchlist);

  const list = watchlist.map((movie: any) => {
    return (
      <div className="flex flex-row border-2 border-red" key={movie.id}>
        <ProfileListItem movieId={movie.id} />
      </div>
    );
  });

  return (
    <main className="flex justify-center text-white">
      <main className="flex flex-row justify-around w-[70vw] py-5 mt-7 border-2 border-red-500">
        <aside className=" flex flex-col justify-center content-center border-2 border-yellow-500 rounded-md w-1/5 p-3 h-1/5">
          <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-1xl lg:text-2xl font-bold">
            Profile
          </h2>
          <div className="flex flex-row items-center">
            <BiUserCircle size={50} />
            <div>
              <h2>{currentUser?.name}</h2>
              <h2>{currentUser?.email}</h2>
            </div>
          </div>
        </aside>

        <section className="flex flex-col justify-around w-3/5">
          {faves?.length > 1 ? (
            <MovieList data={faves} title="My Favorites" />
          ) : (
            <div className="flex flex-col justify-center items-center content-center border-yellow-500 border-2 rounded-md mb-5 p-3">
              <GrAddCircle className="text-white" size={50} />
              <h2>Your Favorites are Empty</h2>
              <p>Add movies to keep track of your favorites</p>
              <button
                onClick={() => router.push("/")}
                className="bg-yellow-500 rounded-md p-1 m-2"
              >
                Browse Movies
              </button>
            </div>
          )}
          {watchlist?.length > 1 ? (
            list
          ) : (
            <div className="flex flex-col justify-center items-center content-center border-yellow-500 border-2 rounded-md mb-5 p-3">
              <GrAddCircle size={50} />
              <h2>Your Watchlist is Empty</h2>
              <p>Add movies to keep track of what you want to watch</p>
              <button
                onClick={() => router.push("/")}
                className="bg-yellow-500 rounded-md p-1 m-2"
              >
                Browse Movies
              </button>
            </div>
          )}
        </section>
      </main>
    </main>
  );
};
export default MyProfile;
