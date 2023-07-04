import tmdbFetcher from "@/lib/tmdbFetcher";
import { useEffect, useState } from "react";
import RestfulMovieCard from "./RestfulMovieCard";

const RestfulMovieList = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchTMDBLists = async () => {
      const populars = await tmdbFetcher("popular");
      setPopularMovies(populars.results);
      const nowPlayings = await tmdbFetcher("now_playing");
      setNowPlayingMovies(nowPlayings.results);
      const upcomings = await tmdbFetcher("upcoming");
      setUpcomingMovies(upcomings.results);
      const tops = await tmdbFetcher("top_rated");
      setTopRatedMovies(tops.results);
    };

    fetchTMDBLists();
  }, []);
  if (
    !popularMovies ||
    !upcomingMovies ||
    !topRatedMovies ||
    !nowPlayingMovies
  ) {
    return null;
  }

  console.log(popularMovies[0]?.title, "POP");
  console.log(nowPlayingMovies[0]?.title, "NP");
  console.log(upcomingMovies[0]?.title, "UP");
  console.log(topRatedMovies[0]?.title, "TOP");
  return (
    <main className="px-4 md:px-12 mt-2 space-y-4">
      <section>
        <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          Current Top 5
        </h2>
        <div className="grid grid-cols-5 gap-2 mb-24 md:mb-48 lg:mb-96">
          {popularMovies.map((movie: any) => {
            // console.log(movie, "<<<<");
            return <RestfulMovieCard key={movie.id} data={movie} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default RestfulMovieList;
