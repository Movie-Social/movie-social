import Hero from "@/components/Hero";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import RestfulMovieList from "@/components/RestfulMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import useWatchlist from "@/hooks/useWatchlist";
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

const Home = () => {
  // const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <main>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <section className="lg:flex lg:flex-col lg:justify-center pb-10">
        <Hero />
        <RestfulMovieList title="Now Playing" />
        <RestfulMovieList title="Upcoming" />
        <RestfulMovieList title="Popular" />
        <MovieList title="Comedy" data={movies} />
        <MovieList title="Romance" data={movies} />
        <MovieList title="Action" data={movies} />
        <MovieList title="Horror" data={movies} />
        <RestfulMovieList title="Top Rated" />
      </section>
    </main>
  );
};
export default Home;
