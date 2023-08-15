import Head from "next/head";
import Hero from "@/components/Hero";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import RestfulInfoModal from "@/components/RestfulInfoModal";
import RestfulMovieList from "@/components/RestfulMovieList";
import useInfoModal from "@/hooks/useInfoModal";
import useRestfulInfoModal from "@/hooks/useRestfulInfoModal";
import useMovieList from "@/hooks/useMovieList";
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
  const { data: movies = [] } = useMovieList();
  const { isOpen, closeModal } = useInfoModal();
  const { isOpenRestful, closeModalRestful } = useRestfulInfoModal();

  return (
    <main>
      <Head>
        <title>Movie Social Club</title>
        <meta
          name="description"
          content="I hope this tutorial is helpful for you"
        />
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <RestfulInfoModal visible={isOpenRestful} onClose={closeModalRestful} />
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
