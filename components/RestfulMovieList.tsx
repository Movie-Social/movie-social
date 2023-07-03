import tmdbFetcher from "@/lib/tmdbFetcher";
import { useEffect, useState } from "react";

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
      //   const upcomings = await tmdbFetcher("upcoming");
      //   setUpcomingMovies(upcomings.results);
    };

    fetchPopulars();
    // fetchUpcomings();
  }, []);
  console.log(popularMovies, "POP");
  // console.log(upcomingMovies, "UP");
  // console.log(nowPlayingMovies, "NP");
  return (
    <main className="px-4 md:px-12 mt-2 space-y-4">
      {/* <h1>test</h1> */}
      {/* <h1>{}</h1> */}
      <section>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {/* {title} */}
        </p>
        <div className="grid grid-cols-5 gap-2 mb-24 md:mb-48 lg:mb-96">
          {/* {data
            .filter((movie) => movie.categories[0] === title)
            .map((movie) => (
              <MovieCard key={movie.id} data={movie} />
            ))} */}
        </div>
      </section>
    </main>
  );
};

export default RestfulMovieList;
