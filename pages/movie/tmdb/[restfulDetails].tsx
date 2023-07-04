import { useRouter } from "next/router";

const RestfulMovieDetails = () => {
  const router = useRouter();
  const movieId = router.query.restfulDetails;

  console.log(movieId, "movieid test");
  return (
    <main>
      <h2>seve</h2>
    </main>
  );
};
export default RestfulMovieDetails;
