/* eslint-disable react-hooks/exhaustive-deps */
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
import { omdbProps, tmdbProps } from "./tmdb/[restfulDetails]";
import FavoriteButton from "@/components/FavoriteButton";
import WatchlistButton from "@/components/WatchlistButton";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

export interface ReviewProps {
  id: string;
  poster: string;
  rating: number;
  review: string;
  title: string;
  userId: string;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const MovieDetails = () => {
  const router = useRouter();
  const movieId = router.query.movieDetails;
  const { data } = useMovie(movieId as string);
  const [rating, setRating] = useState(0);
  const allReviews = useAllReviews();
  const [tmdb, setTmdb] = useState<tmdbProps>();
  const [omdb, setOmdb] = useState<omdbProps>();
  const [details, setDetails] = useState<tmdbProps>();
  const [trailer, setTrailer] = useState("");
  useEffect(() => {
    const fetchTmdb = async () => {
      data?.title;
      const tmdbDetails = await tmdbMovieFetcher(data?.title);
      const details = tmdbDetails?.results
        .filter((movie: any) => movie.original_language === "en")
        .sort((a: any, b: any) => b.popularity - a.popularity)[0];
      setTmdb(details);
    };
    fetchTmdb();
  }, [data?.title]);

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
      tmdb?.id;
      const trailer = await trailerFetcher(tmdb?.id);
      if (trailer?.results?.length > 0) {
        const youtubeKey = trailer.results
          .filter((video: any) => video.type === "Trailer")
          .filter((video: any) => video.site === "YouTube")[0].key;
        setTrailer(youtubeKey);
      }
    };

    fetchTrailer();
  }, [trailer, tmdb?.id, setTrailer]);

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
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <main className="flex flex-col items-center w-full text-white">
      <Navbar />
      <br></br>
      <section className="flex flex-col items-center md:w-[90vw] mt-10">
        <div className="w-full my-5">
          {trailer ? (
            <YouTube
              videoId={trailer}
              opts={opts}
              onReady={onPlayerReady}
              className="aspect-w-16 aspect-h-9 sm:aspect-w-4 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9 lg:aspect-w-16 lg:aspect-h-9 mx-1"
            />
          ) : null}
        </div>
        <section className="flex flex-col">
          {/* :lg may need h-[40vh] justify-evenly*/}
          <aside
            className="flex flex-col items-center md:flex-row border border-purple-500
          "
          >
            {" "}
            {/* <section className="flex flex-row justify-between w-full border border-orange-400">
              <div className="flex justify-center items-center mx-10 border border-pink-700">
                <WatchlistButton movieId={tmdb?.id} />
              </div> */}
            <Image
              priority
              width={300}
              height={20}
              src={!data?.poster ? loady : data?.poster}
              alt={`Movie poster for ${data?.title}`}
              className=" max-[767px]:w-2/5 h-2/5 self-center mb-5 border border-yellow-300 rounded-lg"
            />
            {/* <div className="flex justify-center items-center mx-10 border border-pink-700">
                <FavoriteButton movieId={tmdb?.id} />
              </div>
            </section> */}
            <div className="flex flex-col justify-evenly w-full p-2 mb-4 border-2 border-blue-500 rounded-lg">
              <h2 className="text-white text-center text-xl md:text-2xl lg:text-3xl font-bold">
                {!data?.title ? "..........." : data?.title}
              </h2>
              {details?.tagline ? (
                <h3 className="text-white text-center text-l md:text-xl lg:text-2xl italic">
                  {details?.tagline}
                </h3>
              ) : null}
              <div className="flex flex-row justify-evenly items-center content-center w-5/6 self-center mx-2 border-2 border-red-500 ">
                {omdb?.Rated ? (
                  <div className="ml-4 px-2 border-l border-yellow-300">
                    <p className="text-l">Rated:</p>
                    <p className="text-l">{omdb?.Rated} </p>
                  </div>
                ) : null}
                {details?.release_date ? (
                  <div className="ml-4 px-2 border-l border-yellow-300">
                    <p className="text-l">Year:</p>
                    <p className="text-l">
                      {details?.release_date?.split("-")[0]}{" "}
                    </p>
                  </div>
                ) : null}
                {details?.genres ? (
                  <div className="ml-4 px-2 border-l border-yellow-300">
                    <p className="text-l">Genre:</p>
                    <p className="text-l">
                      {details?.genres.map((genre: any) => genre.name)[0]}{" "}
                    </p>
                  </div>
                ) : null}
                {omdb?.Runtime ? (
                  <div className="ml-4 px-2 border-l border-yellow-300">
                    <p className="text-l">Runtime:</p>
                    <p className="text-l">{omdb?.Runtime} </p>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-row justify-around h-full mt-2 py-1 border border-orange-400">
                {omdb?.imdbRating === "N/A" ? null : (
                  <div className="flex flex-col flex-grow justify-between items-center">
                    <h2 className="text-white text-center text-l md:text-xl lg:text-2xl font-semibold">
                      IMDB
                    </h2>
                    <div className="flex flex-row justify-around items-center content-center">
                      <Image
                        src={imdb}
                        width={50}
                        height={50}
                        alt="IMDB Logo"
                      />
                      <p className="text-white text-center text-l md:text-xl lg:text-2xl ml-2">
                        {omdb?.imdbRating * 10}%
                      </p>
                    </div>
                  </div>
                )}
                {theRottenScore ? (
                  <div className="flex flex-col flex-grow justify-between items-center">
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
                  <div className="flex flex-col flex-grow justify-between items-center">
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
                {/* <div className="flex flex-col flex-grow justify-between items-center">
                  <h2 className="text-white text-center text-xl lg:text-2xl font-semibold">
                    Movie Social
                  </h2>
                  <div className="flex flex-row justify-around items-center content-center">
                    <Image
                      alt="Movie Social logo"
                      className="ml-2 rounded-full"
                      src="/images/newLogo.png"
                      width={50}
                      height={50}
                    />
                    <p className="text-white text-center text-xl lg:text-2xl">
                      {data.score}%
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </aside>

          <article className="w-full lg:w-[90%] lg:self-center lg:ml-[5%] border border-pink-600">
            <h2 className="mx-2 px-2 text-white text-xl md:text-2xl lg:text-3xl font-bold mb-5 border-l-2 border-yellow-300 ">
              Movie Info
            </h2>
            <div className="text-l md:text-xl lg:text-2xl p-2 lg:ml-5 mb-5 border border-green-500">
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
              {details?.genres ? (
                <h2>
                  <span className="font-light text-yellow-300 m-2">
                    Genres:
                  </span>
                  {details?.genres.map((genre: any) => genre.name).join(", ")}
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
                  ${details?.budget.toLocaleString()}
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
            <ExistingReviews data={reviews} />
            <h2 className=" text-white text-xl md:text-2xl lg:text-3xl font-bold mx-2 px-2 border-l-2 border-yellow-300 ">
              Rate and Review
            </h2>
            <br></br>
            <Reviewform
              title={data?.title}
              poster={data?.poster}
              rating={rating}
              onRating={(rate: number) => setRating(rate)}
            />
          </article>
        </section>
      </section>
    </main>
  );
};

export default MovieDetails;
