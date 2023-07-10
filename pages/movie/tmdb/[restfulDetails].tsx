import crypto from "crypto";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import omdbFetcher from "@/lib/omdbFetcher";
import tmdbDetailsFetcher from "@/lib/tmdbDetailsFetcher";
import trash from "../../../public/images/recyclingBag.png";
import rotten from "../../../public/images/rotten.png";
import imdb from "../../../public/images/imdb.png";
import meta from "../../../public/images/meta.png";
import Image from "next/image";
import Reviewform from "@/components/ReviewForm";
import axios from "axios";
import useAllReviews from "@/hooks/useAllReviews";
import ExistingReviews from "@/components/ExistingReviews";
import { ReviewProps } from "../[movieDetails]";

const RestfulMovieDetails = () => {
  const [tmdb, setTmdb] = useState([]);
  const [omdb, setOmdb] = useState([]);
  const [rating, setRating] = useState(0);
  const [mongoMovieId, setMongoMovieId] = useState("");
  const [mongoDetailsId, setMongoDetailsId] = useState("");
  const router = useRouter();
  const movieId = router.query.restfulDetails;
  const allReviews = useAllReviews();
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

  useEffect(() => {
    const generateUniqueHex = () => {
      const bytes = crypto.randomBytes(12);
      return bytes.toString("hex");
    };
    setMongoMovieId(generateUniqueHex());
    setMongoDetailsId(generateUniqueHex());
  }, []);

  useEffect(() => {
    const postMovie = async () => {
      if (omdb?.Title && omdb?.Genre.split(", ")) {
        let response = await axios.post("/api/movie", {
          id: mongoMovieId,
          title: tmdb?.title,
          score: parseInt(omdb?.imdbRating) || 0,
          poster: `https://image.tmdb.org/t/p/original/${tmdb?.poster_path}`,
          categories: omdb?.Genre.split(", ") || [],
          details: mongoDetailsId,
        });
        return response;
      }
    };

    postMovie();
  }, [tmdb, omdb, mongoMovieId, mongoDetailsId]);

  const reviews = allReviews?.data?.filter(
    (review: ReviewProps) => review.title === tmdb?.title
  );

  console.log(reviews, "rev");
  return (
    <main className="text-white flex justify-center">
      <section className="border-2 w-[90vw] h-full">
        <div className="mt-3 mb-5 flex justify-center">
          <video
            autoPlay
            muted
            controls
            className="h-2/5 w-[75%] rounded-md"
            src="https://youtu.be/cnDObXxwWy0"
          ></video>
        </div>
        <section>
          <div className="flex flex-row justify-evenly h-[40vh]">
            <img
              src={`https://image.tmdb.org/t/p/original/${tmdb?.poster_path}`}
              alt={`Movie poster for ${tmdb?.title}`}
              className="rounded-lg border-2"
            />
            <div className="w-3/5 border-2 rounded-lg border-blue-500 flex flex-col justify-evenly">
              <h2 className="text-white text-center text-1xl lg:text-3xl font-bold">
                {tmdb?.title}
              </h2>
              <div className="flex flex-row justify-evenly items-center border-2 border-red-500 w-1/6 self-center text-md lg:text-1xl">
                <button className="border-2 border-yellow-300 p-.8">
                  {omdb?.Rated}
                </button>
                <p>{tmdb?.release_date?.split("-")[0]}, </p>
                <p>{/* {data?.categories[0]}/{data?.categories[1]}, */}</p>
                <p> {omdb?.runtime}</p>
              </div>
              <div className="flex flex-row justify-around mt-2 ">
                <div className="flex flex-col items-center content-center">
                  <h2 className="text-white text-center text-xl lg:text-1xl font-light">
                    IMDB
                  </h2>
                  <div className="flex flex-row justify-around items-center content-center">
                    <Image src={imdb} width={50} height={50} alt="IMDB Logo" />
                    <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                      {omdb?.imdbRating * 10}%
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center content-center">
                  <h2 className="text-white text-center text-xl lg:text-1xl font-light">
                    Rotten Tomatoes
                  </h2>
                  <div className="flex flex-row justify-around items-center content-center">
                    <Image
                      src={rotten}
                      width={50}
                      height={50}
                      alt="Rotten Tomatoes logo"
                    />

                    {/* <p className="text-white text-center text-xl lg:text-2xl font-semibold">{data?.ratings[0].value}</p> */}
                    {/* update once schema is fixed */}
                    <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                      88%
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center content-center">
                  <h2 className="text-white text-center text-xl lg:text-1xl font-light">
                    MetaCritic
                  </h2>
                  <div className="flex flex-row justify-around items-center content-center">
                    <Image
                      src={meta}
                      width={50}
                      height={50}
                      alt="Metacritic logo"
                    />
                    <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                      {/* {omdb?.Ratings[2]?.value?.split("/")[0]}% */}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center content-center">
                  <h2 className="text-white text-center text-xl lg:text-1xl font-light">
                    Movie Social
                  </h2>
                  <div className="flex flex-row justify-around items-center content-center">
                    <Image
                      src={trash}
                      width={50}
                      height={50}
                      alt="Movie Social logo"
                    />
                    {/* <span>{data?.score}</span> */}
                    <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                      88%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="w-[90%] ml-[5%] border-2 self-center mt-5">
            <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
              Rate and Review
            </h2>
            <br></br>
            <Reviewform
              title={tmdb?.title}
              poster={`https://image.tmdb.org/t/p/original/${tmdb?.poster_path}`}
              rating={rating}
              onRating={(rate: number) => setRating(rate)}
            />
            <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
              Movie Info
            </h2>
            <div className="ml-5 text-white text-l lg:text-2xl font-light font ">
              <p className="m-2">{tmdb?.overview}</p>
              <h2>
                <span className="font-light text-yellow-300 m-2">Rating:</span>
                {omdb?.Rated}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">Genre:</span>
                {/* {data?.categories.length === 1
                  ? data?.categories[0]
                  : data?.categories[0] / data?.categories[1]} */}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">
                  Director:
                </span>
                {omdb?.Director}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">Writer:</span>
                {omdb?.Writer}{" "}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">
                  Release Date:
                </span>
                {omdb?.Released}{" "}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">
                  Box Office:
                </span>
                ${omdb?.BoxOffice}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">Runtime:</span>
                {omdb?.Runtime}
              </h2>
              {/* <h2><span>Cast:</span>{data?.director} </h2> */}
            </div>
          </section>
          <ExistingReviews data={reviews} />
          {/* <div>other reviews will go here</div> */}
        </section>
      </section>
    </main>
  );
};
export default RestfulMovieDetails;
