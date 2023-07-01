import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useWatchlist from "@/hooks/useWatchlist";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BiUserCircle } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";

const MyProfile = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: faves } = useFavorites();
  const { data: watchlist } = useWatchlist();
  console.log(currentUser, "<<");
  console.log(faves, "faves");
  console.log(watchlist, "watchlist");
  return (
    <main className="flex justify-center text-white">
      <main className="flex flex-row justify-around w-[70vw] py-5 border-2 border-red-500">
        <aside className="border-2 border-yellow-500 w-1/5">
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

        <section className="border-2 border-blue-500 w-3/5">
          {faves?.length > 1 ? (
            <MovieList data={faves} title="My Favorites" />
          ) : (
            <div className="flex flex-col justify-center items-center content-center border-red-500 border-2">
              <GrAddCircle size={50} />
              <h2>Your Favorites are Empty</h2>
              <p>Add movies to keep track of your favorites</p>
              <button className="bg-yellow-500 rounded-sm">
                Browse Movies
              </button>
            </div>
          )}
          {watchlist?.length > 1 ? (
            <MovieList data={watchlist} title="My Watchlist" />
          ) : (
            <div className="flex flex-col justify-center items-center content-center border-red-500 border-2">
              <GrAddCircle size={50} />
              <h2>Your Watchlist is Empty</h2>
              <p>Add movies to keep track of what you want to watch</p>
              <button className="bg-yellow-500 rounded-sm">
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
