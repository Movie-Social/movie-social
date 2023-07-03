import Hero from "@/components/Hero";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import RestfulMovieList from "@/components/RestfulMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import useTMDB from "@/hooks/useTMDB";
import useWatchlist from "@/hooks/useWatchlist";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

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

const Home = () => {
  // const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const { data: pops = [] } = useTMDB("popular");
  const { data: favorites = [] } = useFavorites();
  const { data: watchlist = [] } = useWatchlist();
  const { isOpen, closeModal } = useInfoModal();

  console.log(pops, "POP");
  return (
    <main>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Hero />
      <RestfulMovieList />
      <section className="pb-40">
        {/* <MovieList title="Watchlist" data={watchlist} /> */}
        <MovieList title="Comedy" data={movies} />
        <MovieList title="Romance" data={movies} />
        <MovieList title="Action" data={movies} />
        <MovieList title="Horror" data={movies} />
        <MovieList title="My Favorites" data={favorites} />
      </section>
    </main>
  );
};
export default Home;
