import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useWatchlist from "@/hooks/useWatchlist";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BiUserCircle } from "react-icons/bi";
const MyProfile = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: faves } = useFavorites();
  const { data: watchlist } = useWatchlist();
  console.log(currentUser, "<<");
  console.log(faves, "faves");
  console.log(watchlist, "watchlist");
  return (
    <main className="flex justify-center text-white">
      <main className="flex flex-row justify-around w-[70vw] h-full border-2 border-red-500">
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
          <MovieList data={faves} title="My Favorites" />
          <MovieList data={watchlist} title="My Watchlist" />
        </section>
      </main>
    </main>
  );
};
export default MyProfile;
