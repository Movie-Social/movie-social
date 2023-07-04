import { useRouter } from "next/router";
import omdbFetcher from "@/lib/omdbFetcher";
import { useEffect, useState } from "react";
const RestfulMovieDetails = () => {
  const [omdb, setOmdb] = useState([]);
  const [tmdb, setTmdb] = useState([]);
  const router = useRouter();
  const movieId = router.query.restfulDetails;
  useEffect(() => {
    const fetchOmdb = async () => {
      const omdbDetails = await omdbFetcher(movieId);
      setOmdb(omdbDetails);
    };
    fetchOmdb();
  }, []);

  // console.log(movieId, "movieid test");
  console.log(omdb, "omdb");
  return (
    <main>
      <h2>seve</h2>
    </main>
  );
};
export default RestfulMovieDetails;
