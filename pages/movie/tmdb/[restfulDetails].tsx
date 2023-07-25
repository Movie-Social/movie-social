import React from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import crypto from "crypto";
import { ReviewProps } from "../[movieDetails]";
import omdbFetcher from "@/lib/omdbFetcher";
import trailerFetcher from "@/lib/trailerFetcher";
import tmdbDetailsFetcher from "@/lib/tmdbDetailsFetcher";
import useAllReviews from "@/hooks/useAllReviews";
import trash from "../../../public/images/recyclingBag.png";
import rotten from "../../../public/images/rotten.png";
import imdb from "../../../public/images/imdb.png";
import meta from "../../../public/images/meta.png";
import loady from "../../../public/images/imgLoad.gif";
import Navbar from "@/components/Navbar";
import Reviewform from "@/components/ReviewForm";
import ExistingReviews from "@/components/ExistingReviews";

const RestfulMovieDetails = () => {
  const [tmdb, setTmdb] = useState([]);
  const [omdb, setOmdb] = useState([]);
  const [rating, setRating] = useState(0);
  const [mongoMovieId, setMongoMovieId] = useState("");
  const [mongoDetailsId, setMongoDetailsId] = useState("");
  const router = useRouter();
  const movieId = router.query.restfulDetails;
  const allReviews = useAllReviews();
  const [trailer, setTrailer] = useState("");
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
    (review: ReviewProps) => review.title === tmdb?.title
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
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <main className="w-[100vh] text-white">
      <Navbar />
      <br></br>
      <section className="flex flex-col items-center w-[100vh] lg:w-[90vw] mt-10 border border-red-600">
        <div className="mb-5 mt-3">
          {trailer ? (
            <YouTube videoId={trailer} opts={opts} onReady={onPlayerReady} />
          ) : null}
        </div>
        <section className="flex flex-col">
          {/* :lg may need h-[40vh] justify-evenly*/}
          <aside
            className="flex flex-col items-center lg:flex-row border border-purple-500
          "
          >
            <Image
              priority
              width={300}
              height={20}
              src={
                !tmdb?.poster_path
                  ? loady
                  : `https://image.tmdb.org/t/p/original/${tmdb?.poster_path}`
              }
              alt={`Movie poster for ${tmdb?.title}`}
              className="w-2/5 self-center mb-5 border border-yellow-300 rounded-lg"
            />
            <div className="flex flex-col justify-evenly w-full border-2 border-blue-500 rounded-lg">
              <h2 className="text-white text-center text-2xl lg:text-3xl font-bold">
                {!tmdb?.title ? "..........." : tmdb?.title}
              </h2>
              {tmdb?.tagline ? (
                <h3 className="text-white text-center text-xl lg:text-2xl italic">
                  {tmdb?.tagline}
                </h3>
              ) : null}
              <div className="flex flex-row justify-evenly items-center self-center border-2 border-red-500 ">
                {omdb?.Rated ? (
                  <p className="text-l">Rated: {omdb?.Rated} </p>
                ) : null}
                {tmdb?.release_date ? (
                  <p className="text-l">
                    | Year: {tmdb?.release_date?.split("-")[0]}{" "}
                  </p>
                ) : null}
                {tmdb?.genres ? (
                  <p className="text-l">
                    | Genre: {tmdb?.genres.map((genre) => genre.name)[0]}
                  </p>
                ) : null}
                {omdb?.Runtime ? (
                  <p className="text-l"> | Runtime: {omdb?.Runtime}</p>
                ) : null}
              </div>
              <div className="flex flex-row justify-around mt-2 ">
                {omdb?.imdbRating ? (
                  <div className="flex flex-col">
                    <h2 className="text-white text-center text-xl lg:text-2xl font-semibold">
                      IMDB
                    </h2>
                    <div className="flex flex-row justify-around items-center content-center">
                      <Image
                        src={imdb}
                        width={50}
                        height={50}
                        alt="IMDB Logo"
                      />
                      <p className="text-white text-center text-xl lg:text-2xl">
                        {omdb?.imdbRating * 10}%
                      </p>
                    </div>
                  </div>
                ) : null}
                {theRottenScore ? (
                  <div className="flex flex-col">
                    <h2 className="text-white text-center text-xl lg:text-2xl font-semibold">
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
                      <p className="text-white text-center text-xl lg:text-2xl">
                        {theRottenScore}
                      </p>
                    </div>
                  </div>
                ) : null}
                {omdb?.Metascore === "N/A" ? null : (
                  <div className="flex flex-col">
                    <h2 className="text-white text-center text-xl lg:text-2xl font-semibold">
                      MetaCritic
                    </h2>
                    <div className="flex flex-row justify-around items-center content-center">
                      <Image
                        src={meta}
                        width={50}
                        height={50}
                        alt="Metacritic logo"
                      />
                      <p className="text-white text-center text-xl lg:text-2xl">
                        {omdb?.Metascore}%
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col">
                  <h2 className="text-white text-center text-xl lg:text-2xl font-semibold">
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
                    <p className="text-white text-center text-xl lg:text-2xl">
                      88%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="w-[90%] ml-[5%] border-2 self-center mt-5">
            <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
              Movie Info
            </h2>
            <div className="ml-5 text-white text-l lg:text-2xl font-light font ">
              {tmdb?.overview ? (
                <p className="m-2">{tmdb?.overview}</p>
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
              {tmdb?.genres ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Genres:
                  </span>
                  {tmdb?.genres.map((genre) => genre.name).join(", ")}
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
              {tmdb?.budget ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Budget:
                  </span>
                  ${tmdb?.budget.toLocaleString("en-US")}
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
            <ExistingReviews data={reviews} />
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
          </section>
        </section>
      </section>
    </main>
  );
};
export default RestfulMovieDetails;
