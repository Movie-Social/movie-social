/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { ReviewProps } from "../[movieDetails]";
import omdbFetcher from "@/lib/omdbFetcher";
import trailerFetcher from "@/lib/trailerFetcher";
import tmdbDetailsFetcher from "@/lib/tmdbDetailsFetcher";
import useAllReviews from "@/hooks/useAllReviews";
import rotten from "../../../public/images/rotten.png";
import imdb from "../../../public/images/imdb.jpeg";
import meta from "../../../public/images/meta.png";
import loady from "../../../public/images/imgLoad.gif";
import Navbar from "@/components/Navbar";
import Reviewform from "@/components/ReviewForm";
import ExistingReviews from "@/components/ExistingReviews";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

export interface tmdbProps {
  id: string | any;
  title: string;
  poster_path: string;
  tagline: string;
  overview: string;
  genres: string[];
  budget: string;
  release_date: string;
}

export interface omdbProps {
  Title: string;
  Genre: string;
  imdbRating: string | any;
  Ratings: Rating[];
  Metascore: string;
  Plot: string;
  Runtime: string;
  Rated: string;
  Released: string;
  Director: string;
  Writer: string;
  Actors: string;
  BoxOffice: string;
}

export interface Rating {
  Source: string;
  Value: string;
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

const RestfulMovieDetails = () => {
  const [tmdb, setTmdb] = useState<tmdbProps>();
  const [omdb, setOmdb] = useState<omdbProps>();
  const [rating, setRating] = useState(0);
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
  }, [movieId]);

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
    const fetchTrailer = async () => {
      tmdb?.id;
      const trailer = await trailerFetcher(tmdb?.id as string);
      if (trailer?.results?.length > 0) {
        const youtubeKey = trailer.results
          .filter((video: any) => video.type === "Trailer")
          .filter((video: any) => video.site === "YouTube")[0].key;
        setTrailer(youtubeKey);
      }
    };

    fetchTrailer();
  }, [trailer, tmdb?.id]);

  const movieReviews = allReviews?.data?.filter(
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

  const opts: any["opts"] = {
    playerVars: {
      autoplay: 1,
      mute: 1,
    },
  };

  return (
    <main className="flex flex-col items-center w-full text-white">
      <Head>
        <title>Movie Social Club</title>
      </Head>
      <Navbar />
      <br></br>
      <section className="flex flex-col items-center md:w-[90vw] mt-10">
        <div className="lg:flex lg:justify-center w-full my-5">
          {trailer ? (
            <YouTube
              videoId={trailer}
              opts={opts}
              className="aspect-w-16 aspect-h-9 sm:aspect-w-5 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9 lg:w-[80vw] lg:aspect-h-6 mx-1"
            />
          ) : null}
        </div>
        <section className="flex flex-col lg:w-[80vw]">
          <aside
            className="flex flex-col items-center md:flex-row
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
              className="max-[767px]:w-2/5 h-2/5 self-center mb-5 border border-yellow-300 rounded-lg"
            />
            <div className="flex flex-col justify-evenly md:w-full p-2 my-4 md:ml-10 border border-yellow-300 rounded-lg bg-opacity-50">
              <h2 className="text-white text-center text-xl md:text-2xl lg:text-3xl font-bold lg:font-semibold">
                {!tmdb?.title ? "..........." : tmdb?.title}
              </h2>
              {tmdb?.tagline ? (
                <h3 className="text-white text-center text-l md:text-xl lg:text-2xl lg:my-3 italic">
                  {tmdb?.tagline}
                </h3>
              ) : null}
              <div className="flex flex-row justify-evenly items-center content-center w-5/6 self-center m-3">
                {omdb?.Rated !== "N/A" ? (
                  <div className="ml-4 px-2">
                    <p className="text-l lg:text-xl">Rated:</p>
                    <p className="text-l lg:text-xl">{omdb?.Rated} </p>
                  </div>
                ) : null}
                {tmdb?.release_date ? (
                  <div className="ml-4 px-2">
                    <p className="text-l lg:text-xl">Year:</p>
                    <p className="text-l lg:text-xl">
                      {tmdb?.release_date?.split("-")[0]}{" "}
                    </p>
                  </div>
                ) : null}
                {tmdb?.genres ? (
                  <div className="ml-4 px-2">
                    <p className="text-l lg:text-xl">Genre:</p>
                    <p className="text-l lg:text-xl">
                      {tmdb?.genres.map((genre: any) => genre.name)[0]}{" "}
                    </p>
                  </div>
                ) : null}
                {omdb?.Runtime !== "N/A" ? (
                  <div className="ml-4 px-2">
                    <p className="text-l lg:text-xl">Runtime:</p>
                    <p className="text-l lg:text-xl">{omdb?.Runtime} </p>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-row justify-around h-full mt-2 py-1">
                {omdb?.imdbRating === "N/A" ? null : (
                  <div className="flex flex-col flex-grow justify-between items-center">
                    <h2 className="text-white text-center text-md md:text-xl lg:text-2xl md:font-semibold">
                      IMDB
                    </h2>
                    <div className="flex flex-row justify-around items-center content-center">
                      <Image
                        src={imdb}
                        width={50}
                        height={50}
                        alt="IMDB Logo"
                        className="rounded-lg"
                      />
                      <p className="text-white text-center text-l md:text-xl lg:text-2xl ml-2">
                        {omdb?.imdbRating * 10}%
                      </p>
                    </div>
                  </div>
                )}
                {theRottenScore ? (
                  <div className="flex flex-col flex-grow justify-between items-center">
                    <h2 className="text-white text-center text-md md:text-xl lg:text-2xl md:font-semibold">
                      Rotten Tomatoes
                    </h2>
                    <div className="flex flex-row justify-around items-center content-center">
                      <Image
                        className="rounded-lg"
                        src={rotten}
                        width={50}
                        height={50}
                        alt="Rotten Tomatoes logo"
                      />
                      <p className="text-white text-center text-l md:text-xl lg:text-2xl ml-2">
                        {theRottenScore}
                      </p>
                    </div>
                  </div>
                ) : null}
                {omdb?.Metascore === "N/A" ? null : (
                  <div className="flex flex-col flex-grow justify-between items-center">
                    <h2 className="text-white text-center text-md md:text-xl lg:text-2xl md:font-semibold">
                      MetaCritic
                    </h2>
                    <div className="flex flex-row justify-around items-center content-center">
                      <Image
                        src={meta}
                        width={50}
                        height={50}
                        alt="Metacritic logo"
                        className="rounded-lg"
                      />
                      <p className="text-white text-center text-l md:text-xl lg:text-2xl ml-2">
                        {omdb?.Metascore}%
                      </p>
                    </div>
                  </div>
                )}
                {/* FUTURE FEATURE BELOW */}
                {/* <div className="flex flex-col flex-grow justify-between items-center">
                  <h2 className="text-white text-center text-l md:text-xl lg:text-2xl font-semibold">
                    Movie Social
                  </h2>
                  <div className="flex flex-row justify-around items-center content-center">
                    <Image
                      alt="Movie Social logo"
                      className="rounded-full"
                      src="/images/newLogo.png"
                      width={50}
                      height={50}
                    />
                    <p className="text-white text-center text-l md:text-xl lg:text-2xl ml-2">
{data?.score}                  
    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </aside>

          <article className="w-full lg:self-center">
            <h2 className="mx-2 px-2 text-white text-xl md:text-2xl lg:text-3xl font-bold lg:font-semibold mb-5 border-l-2 border-yellow-300 ">
              Movie Info
            </h2>
            <div className="text-l md:text-xl lg:text-2xl py-2 mb-5 ">
              {tmdb?.overview ? (
                <p className="m-2">{tmdb?.overview}</p>
              ) : (
                <p className="m-2">{omdb?.Plot}</p>
              )}
              {omdb?.Runtime !== "N/A" ? (
                <h2 className="mx-2">
                  <span className="font-light text-yellow-300 mr-2">
                    Runtime:
                  </span>
                  {omdb?.Runtime}
                </h2>
              ) : null}
              {omdb?.Rated !== "N/A" ? (
                <h2 className="mx-2">
                  <span className="font-light text-yellow-300 mr-2">
                    Rating:
                  </span>
                  {omdb?.Rated}
                </h2>
              ) : null}
              {tmdb?.genres ? (
                <h2 className="mx-2">
                  <span className="font-light text-yellow-300 mr-2">
                    Genres:
                  </span>
                  {tmdb?.genres.map((genre: any) => genre.name).join(", ")}
                </h2>
              ) : null}
              {omdb?.Released !== "N/A" ? (
                <h2 className="mx-2">
                  <span className="font-light text-yellow-300 mr-2">
                    Release Date:
                  </span>
                  {omdb?.Released}{" "}
                </h2>
              ) : null}
              {omdb?.Director !== "N/A" ? (
                <h2 className="mx-2">
                  <span className="font-light text-yellow-300 mr-2">
                    Director(s):
                  </span>
                  {omdb?.Director}
                </h2>
              ) : null}
              {omdb?.Writer !== "N/A" ? (
                <h2 className="mx-2">
                  <span className="font-light text-yellow-300 mr-2">
                    Writer(s):
                  </span>
                  {omdb?.Writer}{" "}
                </h2>
              ) : null}
              {omdb?.Actors !== "N/A" ? (
                <h2 className="mx-2">
                  <span className="font-light text-yellow-300 mr-2">
                    Actors:
                  </span>
                  {omdb?.Actors}{" "}
                </h2>
              ) : null}
              {tmdb?.budget ? (
                <h2 className="mx-2">
                  <span className="font-light text-yellow-300 mr-2">
                    Budget:
                  </span>
                  ${tmdb?.budget.toLocaleString()}
                </h2>
              ) : null}
              {omdb?.BoxOffice !== "N/A" ? (
                <h2 className="mx-2">
                  <span className="font-light text-yellow-300 mr-2">
                    Box Office:
                  </span>
                  {omdb?.BoxOffice}
                </h2>
              ) : null}
            </div>
            <ExistingReviews data={movieReviews} />
            <h2 className=" text-white text-xl md:text-2xl lg:text-3xl font-bold lg:font-semibold mx-2 px-2 border-l-2 border-yellow-300">
              Rate and Review
            </h2>
            <br></br>
            <Reviewform
              title={tmdb?.title}
              poster={`https://image.tmdb.org/t/p/original/${tmdb?.poster_path}`}
              rating={rating}
              onRating={(rate: number) => setRating(rate)}
            />
          </article>
        </section>
      </section>
    </main>
  );
};
export default RestfulMovieDetails;
