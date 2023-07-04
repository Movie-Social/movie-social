import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import omdbFetcher from "@/lib/omdbFetcher";
import tmdbDetailsFetcher from "@/lib/tmdbDetailsFetcher";
const RestfulMovieDetails = () => {
  const [tmdb, setTmdb] = useState([]);
  const [omdb, setOmdb] = useState([]);
  const router = useRouter();
  const movieId = router.query.restfulDetails;
  useEffect(() => {
    const fetchTmdb = async () => {
      const tmdbDetails = await tmdbDetailsFetcher(movieId);
      setTmdb(tmdbDetails);
    };
    fetchTmdb();
  }, []);
  useEffect(() => {
    const fetchOmdb = async () => {
      const omdbDetails = await omdbFetcher(tmdb?.title);
      setOmdb(omdbDetails);
    };
    if (tmdb?.title) {
      fetchOmdb();
    }
  }, [tmdb]);
  console.log(omdb, "omdb");
  return (
    <main>
      <h2>seve</h2>
    </main>
  );
};
export default RestfulMovieDetails;
