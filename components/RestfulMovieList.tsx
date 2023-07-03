import tmdbFetcher from "@/lib/tmdbFetcher";
import { useEffect, useState } from "react";

const RestfulMovieList = () => {
  const [popularMovies, setPopularMovies] = useState<any>();
  const [upcomingMovies, setUpcomingMovies] = useState<any>();
  // const [nowPlayingMovies, setNowPlayingMovies] = useState<any>();

  useEffect(() => {
    const fetchPopulars = async () => {
      const populars = await tmdbFetcher("popular");
      setPopularMovies(populars.results);
      // const nowPlayings = await tmdbFetcher("now_playing");
      // setNowPlayingMovies(nowPlayings.results);
    };

    const fetchUpcomings = async () => {
      const upcomings = await tmdbFetcher("upcoming");
      setUpcomingMovies(upcomings.results);
    };
    fetchPopulars();
    // fetchUpcomings();
  }, []);
  console.log(popularMovies, "POP");
  // console.log(upcomingMovies, "UP");
  // console.log(nowPlayingMovies, "NP");
  return (
    <main>
      <h1>test</h1>
      {/* <h1>{}</h1> */}
    </main>
  );
};

export default RestfulMovieList;
