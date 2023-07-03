import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useWatchlist from "@/hooks/useWatchlist";
import useReviews from "@/hooks/useReviews";
//! import Navbar from "@/components/Navbar";
import ProfileList from "@/components/ProfileList";
import { BiUserCircle } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { useRouter } from "next/router";
import ReviewList from "@/components/ReviewList";

const MyProfile = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: faves } = useFavorites();
  const { data: watchlist } = useWatchlist();
  const { data: reviews } = useReviews();
  const router = useRouter();
  return (
    <main className="flex justify-center text-white">
      <main className="flex flex-row justify-around w-[70vw] py-5 mt-7 border-2 border-red-500">
        <aside className=" flex flex-col justify-center  items-centercontent-center border-2 border-yellow-500 rounded-md w-1/5 p-3 h-1/5">
          <h2 className="border-l-2 border-yellow-500 mb-2 mx-2 px-2 text-1xl lg:text-2xl font-bold">
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
          <div className="flex flex-row justify-between items-center">
            <h2 className="border-l-2 border-yellow-500 mb-2 mx-2 px-2 text-1xl lg:text-2xl font-bold">
              Favorites
            </h2>
            <h2 className="text-yellow-400 cursor-pointer text-l lg:text-xl font-light">
              View All
            </h2>
          </div>
          {faves?.length >= 1 ? (
            <ProfileList data={faves} />
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
          <div className="flex flex-row justify-between items-center">
            <h2 className="border-l-2 border-yellow-500 mb-2 mx-2 px-2 text-1xl lg:text-2xl font-bold">
              Watchlist
            </h2>
            <h2 className="text-yellow-400 cursor-pointer text-l lg:text-xl font-light">
              View All
            </h2>
          </div>
          {watchlist?.length >= 1 ? (
            <ProfileList data={watchlist} />
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
          <div className="flex flex-row justify-between items-center">
            <h2 className="border-l-2 border-yellow-500 mb-2 mx-2 px-2 text-1xl lg:text-2xl font-bold">
              My Reviews
            </h2>
            <h2 className="text-yellow-400 cursor-pointer text-l lg:text-xl font-light">
              View All
            </h2>
          </div>
          {reviews?.length >= 1 ? (
            <ReviewList data={reviews} />
          ) : (
            <div className="flex flex-col justify-center items-center content-center border-yellow-500 border-2 rounded-md mb-5 p-3">
              <GrAddCircle size={50} />
              <h2>No Reviews Yet</h2>
              <p className="text-center">
                Rate movies you have seen using our 5 star scale to share your
                reactions and opinions
              </p>
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
