import { useRouter } from "next/router";
import ProfileList from "@/components/ProfileList";
import ReviewList from "@/components/ReviewList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useReviews from "@/hooks/useReviews";
import useWatchlist from "@/hooks/useWatchlist";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const MyProfile = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: faves } = useFavorites();
  const { data: watchlist } = useWatchlist();
  const { data: reviews } = useReviews();
  const router = useRouter();
  return (
    <main className="flex justify-center text-white">
      <Navbar />
      <main className="flex flex-col lg:flex-row justify-around lg:justify-between w-[100vw] lg:w-4/5 py-5 mt-10">
        <aside className="flex flex-col content-center w-full lg:w-1/6 h-1/5 lg:h-1/6 p-2 lg:p-0 mb-3 lg:border lg:border-yellow-300 rounded-md">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2 mx-2 md:mx-10 lg:mx-1 md:my-5 px-2 max-[700px]:border-l-2 border-yellow-300">
            Profile
          </h2>
          <section className="flex flex-row items-center md:mx-10 lg:mx-1 ">
            <BiUserCircle size={35} />
            <div className="px-2 lg:p-0">
              <h2>user: {currentUser?.name}</h2>
            </div>
          </section>
        </aside>
        <section className="flex flex-col justify-around w-5/5 lg:w-4/6 px-2 lg:border lg:border-yellow-300 rounded-md">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 mx-2 md:mx-10 md:my-5 px-2 border-l-2 border-yellow-300">
              Favorites
            </h2>
            {/* <h2 className="text-yellow-400 cursor-pointer text-l lg:text-xl font-light">
              View All
            </h2> */}
          </div>
          {faves?.length >= 1 ? (
            <ProfileList data={faves} />
          ) : (
            <div className="flex flex-col justify-center items-center content-center md:w-5/6 md:self-center mb-5 p-3 border-yellow-300 border-2 rounded-md">
              <AiOutlinePlusCircle className="text-white" size={50} />
              <h2>Your Favorites are Empty</h2>
              <p>Add movies to keep track of your favorites</p>
              <button
                onClick={() => router.push("/")}
                className="p-1 m-2 bg-yellow-300 rounded-md"
              >
                Browse Movies
              </button>
            </div>
          )}
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 mx-2 md:mx-10 md:my-5 px-2 border-l-2 border-yellow-300">
              Watchlist
            </h2>
            {/* <h2 className="text-yellow-400 cursor-pointer text-l lg:text-xl font-light">
              View All
            </h2> */}
          </div>
          {watchlist?.length >= 1 ? (
            <ProfileList data={watchlist} />
          ) : (
            <div className="flex flex-col justify-center items-center content-center md:w-5/6 md:self-center mb-5 p-3 border-yellow-300 border-2 rounded-md">
              <AiOutlinePlusCircle className="text-white" size={50} />
              <h2>Your Watchlist is Empty</h2>
              <p>Add movies to keep track of what you want to watch</p>
              <button
                onClick={() => router.push("/")}
                className="p-1 m-2 bg-yellow-300 rounded-md"
              >
                Browse Movies
              </button>
            </div>
          )}
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 mx-2 md:mx-10 md:my-5 px-2 border-l-2 border-yellow-300">
              My Reviews
            </h2>
            {/* <h2 className="text-yellow-400 cursor-pointer text-l lg:text-xl font-light">
              View All
            </h2> */}
          </div>
          {reviews?.length >= 1 ? (
            <ReviewList data={reviews} />
          ) : (
            <div className="flex flex-col justify-center items-center content-center md:w-5/6 md:self-center  mb-5 p-3 border-yellow-300 border-2 rounded-md">
              <AiOutlinePlusCircle size={50} />
              <h2>No Reviews Yet</h2>
              <p className="text-center">
                Rate movies you have seen using to share your reactions and
                opinions
              </p>
              <button
                onClick={() => router.push("/")}
                className="p-1 m-2 bg-yellow-300 rounded-md"
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
