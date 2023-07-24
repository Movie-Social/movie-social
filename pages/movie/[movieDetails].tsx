import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Reviewform from "@/components/ReviewForm";
import trailerFetcher from "@/lib/trailerFetcher";
import tmdbMovieFetcher from "@/lib/tmdbMovieFetcher";
import useAllReviews from "@/hooks/useAllReviews";
import useMovie from "@/hooks/useMovie";
import ExistingReviews from "@/components/ExistingReviews";
import Navbar from "@/components/Navbar";
import trash from "../../public/images/recyclingBag.png";
import rotten from "../../public/images/rotten.png";
import imdb from "../../public/images/imdb.png";
import meta from "../../public/images/meta.png";
import loady from "../../public/images/imgLoad.gif";
import YouTube, { YouTubeProps } from "react-youtube";
import tmdbDetailsFetcher from "@/lib/tmdbDetailsFetcher";
import omdbFetcher from "@/lib/omdbFetcher";
export interface ReviewProps {
  id: string;
  poster: string;
  rating: number;
  review: string;
  title: string;
  userId: string;
}

const MovieDetails = () => {
  const router = useRouter();
  const movieId = router.query.movieDetails;
  const { data } = useMovie(movieId as string);
  const [rating, setRating] = useState(0);
  const allReviews = useAllReviews();
  const [tmdb, setTmdb] = useState({});
  const [omdb, setOmdb] = useState([]);
  const [details, setDetails] = useState({});
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    const fetchTmdb = async () => {
      const tmdbDetails = await tmdbMovieFetcher(data?.title);
      const details = tmdbDetails?.results
        .filter((movie) => movie.original_language === "en")
        .filter((movie) => movie.original_title === data?.title)
        .sort((a, b) => b.popularity - a.popularity)[0];
      setTmdb(details);
    };
    fetchTmdb();
  }, []);

  useEffect(() => {
    const fetchTmdb = async () => {
      const tmdbDetails = await tmdbDetailsFetcher(tmdb?.id);
      setDetails(tmdbDetails);
    };
    fetchTmdb();
  }, []);

  useEffect(() => {
    const fetchOmdb = async () => {
      const omdbDetails = await omdbFetcher(data?.title);
      setOmdb(omdbDetails);
    };
    if (tmdb?.title) {
      fetchOmdb();
    }
  }, [tmdb]);

  useEffect(() => {
    const fetchTrailer = async () => {
      await tmdb?.id;
      const trailer = await trailerFetcher(tmdb?.id);
      if (trailer?.results?.length > 0) {
        const youtubeKey = trailer.results
          .filter((video: any) => video.type === "Trailer")
          .filter((video: any) => video.site === "YouTube")[0].key;
        setTrailer(youtubeKey);
      }
    };

    fetchTrailer();
  }, [trailer, tmdb]);

  const reviews = allReviews?.data?.filter(
    (review: ReviewProps) => review.title === data?.title
  );

  const rottenScore = () => {
    if (!omdb?.Ratings) {
      return null;
    } else {
      return omdb?.Ratings.reduce((acc, rate) => {
        if (rate.Source === "Rotten Tomatoes") {
          acc = rate.Value;
        }
        return acc;
      }, "");
    }
  };

  const theRottenScore = rottenScore();

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "1000",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <main className="text-white flex justify-center">
      <Navbar />
      <br></br>
      <section className="w-[90vw] mt-10">
        <div className="mt-3 mb-5 flex justify-center">
          {trailer ? (
            <YouTube videoId={trailer} opts={opts} onReady={onPlayerReady} />
          ) : null}
        </div>

        <section>
          <div className="flex flex-row justify-evenly h-[40vh]">
            <Image
              priority
              width={350}
              height={20}
              src={!data?.poster ? loady : data?.poster}
              alt={`Movie poster for ${data?.title}`}
              className="rounded-lg border border-yellow-300"
            />
            <div
              className="w-3/5 border-2 rounded-lg border-blue-500 flex flex-col justify-evenly
   
            "
            >
              <h2 className="text-white text-center text-1xl lg:text-3xl font-bold">
                {!data?.title ? "..........." : data?.title}
              </h2>
              {details?.tagline ? (
                <h3 className="text-white text-center text-xl ">
                  {details?.tagline}
                </h3>
              ) : null}
              <div className="flex flex-row justify-evenly items-center border-2 border-red-500 w-1/6 self-center text-md lg:text-1xl">
                {omdb?.Rated ? (
                  <p className="border-2 border-yellow-300 p-.8">
                    {omdb?.Rated}
                  </p>
                ) : null}
                {details?.release_date ? (
                  <p>, {details?.release_date?.split("-")[0]}</p>
                ) : null}
                {details?.genres ? (
                  <p>, {details?.genres.map((genre) => genre.name)[0]}</p>
                ) : null}
                {omdb?.Runtime ? <p>, {omdb?.Runtime}</p> : null}
              </div>
              <div className="flex flex-row justify-around mt-2 ">
                {omdb?.imdbRating ? (
                  <div className="flex flex-col items-center content-center">
                    <h2 className="text-white text-center text-xl lg:text-1xl font-light">
                      IMDB
                    </h2>
                    <div className="flex flex-row justify-around items-center content-center">
                      <Image
                        src={imdb}
                        width={50}
                        height={50}
                        alt="IMDB Logo"
                      />
                      <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                        {omdb?.imdbRating * 10}%
                      </p>
                    </div>
                  </div>
                ) : null}
                {theRottenScore ? (
                  <div className="flex flex-col items-center content-center">
                    <h2 className="text-white text-center text-xl lg:text-1xl font-light">
                      Rotten Tomatoes
                    </h2>
                    <div className="flex flex-row justify-around items-center content-center">
                      <Image
                        className="rounded-full"
                        src={rotten}
                        width={50}
                        height={50}
                        alt="Rotten Tomatoes logo"
                      />
                      <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                        {theRottenScore}
                      </p>
                    </div>
                  </div>
                ) : null}
                {omdb?.Metascore === "N/A" ? null : (
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
                        {omdb?.Metascore}%
                      </p>
                    </div>
                  </div>
                )}
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
            <br></br>
            <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
              Movie Info
            </h2>
            <div className="ml-5 text-white text-l lg:text-2xl font-light font ">
              {data?.summary ? (
                <p className="m-2">{data?.summary}</p>
              ) : (
                <p className="m-2">{omdb?.Plot}</p>
              )}
              {omdb?.Runtime ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Runtime:
                  </span>
                  {omdb?.Runtime}
                </h2>
              ) : null}
              {omdb?.Rated ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Rating:
                  </span>
                  {omdb?.Rated}
                </h2>
              ) : null}
              {details?.genres ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Genres:
                  </span>
                  {details?.genres.map((genre) => genre.name).join(", ")}
                </h2>
              ) : null}
              {omdb?.Released ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Release Date:
                  </span>
                  {omdb?.Released}{" "}
                </h2>
              ) : null}
              {omdb?.Director ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Director(s):
                  </span>
                  {omdb?.Director}
                </h2>
              ) : null}
              {omdb?.Writer ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Writer(s):
                  </span>
                  {omdb?.Writer}{" "}
                </h2>
              ) : null}
              {omdb?.Actors ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Actors:
                  </span>
                  {omdb?.Actors}{" "}
                </h2>
              ) : null}
              {details?.budget ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Budget:
                  </span>
                  ${details?.budget.toLocaleString("en-US")}
                </h2>
              ) : null}
              {omdb?.BoxOffice ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Box Office:
                  </span>
                  {omdb?.BoxOffice}
                </h2>
              ) : null}
            </div>
            <br></br>
          </section>
          <ExistingReviews data={reviews} />
          <br></br>
          <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
            Rate and Review
          </h2>
          <Reviewform
            title={data?.title}
            poster={data?.poster}
            rating={rating}
            onRating={(rate: number) => setRating(rate)}
          />
        </section>
      </section>
    </main>
  );
};

export default MovieDetails;
