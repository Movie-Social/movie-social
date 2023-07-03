import tmdbFetcher from "@/lib/tmdbFetcher";
import { useEffect, useState } from "react";
import RestfulMovieCard from "./RestfulMovieCard";

const RestfulMovieList = () => {
  const [popularMovies, setPopularMovies] = useState<any>();
  // const [upcomingMovies, setUpcomingMovies] = useState<any>();
  // const [nowPlayingMovies, setNowPlayingMovies] = useState<any>();

  useEffect(() => {
    const fetchPopulars = async () => {
      const populars = await tmdbFetcher("popular");
      setPopularMovies(populars.results);
      // const nowPlayings = await tmdbFetcher("now_playing");
      // setNowPlayingMovies(nowPlayings.results);
      // const upcomings = await tesFetcher();
      // setUpcomingMovies(upcomings.results);
    };

    fetchPopulars();
    // fetchUpcomings();
  }, []);
  if (!popularMovies) {
    return null;
  }

  console.log(popularMovies, "POP");
  // console.log(upcomingMovies, "UP");
  // console.log(nowPlayingMovies, "NP");
  return (
    <main className="px-4 md:px-12 mt-2 space-y-4">
      <section>
        <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          Current Top 5
        </h2>
        <div className="grid grid-cols-5 gap-2 mb-24 md:mb-48 lg:mb-96">
          {popularMovies.map((movie: any) => {
            console.log(movie, "<<<<");
            return <RestfulMovieCard key={movie.id} data={movie} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default RestfulMovieList;
