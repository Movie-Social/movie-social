import Hero from "@/components/Hero";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";
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
  const { data: favorites = [] } = useFavorites();

  return (
    <main>
      <Navbar />
      <Hero />
      <section className="pb-40">
        <MovieList title="My List" data={favorites} />
        <MovieList title="Comedy" data={movies} />
        <MovieList title="Romance" data={movies} />
        <MovieList title="Action" data={movies} />
        <MovieList title="Horror" data={movies} />
      </section>
    </main>
  );
};
export default Home;
