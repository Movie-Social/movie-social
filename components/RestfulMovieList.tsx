import tmdbFetcher from "@/lib/tmdbFetcher";
import { useEffect, useState } from "react";

const RestfulMovieList = () => {
  const [popularMovies, setPopularMovies] = useState<any>();

  useEffect(() => {
    const fetchPopulars = async () => {
      const populars = await tmdbFetcher();
      setPopularMovies(populars.results);
    };
    fetchPopulars();
  }, []);
  console.log(popularMovies[0]);
  return (
    <main>
      <h1>test</h1>
      {/* <h1>{}</h1> */}
    </main>
  );
};

export default RestfulMovieList;
