import Navbar from "@/components/Navbar";
import useMovie from "@/hooks/useMovie";
import trash from "../../public/images/recyclingBag.png";
import rotten from "../../public/images/rotten.png";
import imdb from "../../public/images/imdb.png";
import meta from "../../public/images/meta.png";
import Image from "next/image";
import { useRouter } from "next/router";

const MovieDetails = () => {
  const router = useRouter();
  const movieId = router.query.movieDetails;
  const { data } = useMovie(movieId as string);
  console.log(data, "testing testing");
  return (
    <main className="text-white flex justify-center">
      {/* <Navbar /> */}
      <section className="border-2 w-[90vw] h-full">
        <div className="mt-3 mb-5 flex justify-center">
          <video
            autoPlay
            muted
            controls
            className="h-2/5 w-[75%] rounded-md"
            // src={data?.videoUrl}
            src="https://youtu.be/cnDObXxwWy0"
          ></video>
        </div>
        <section>
          <div className="flex flex-row justify-evenly h-[40vh]">
            <img
              src={data?.poster}
              alt={`Movie poster for ${data?.title}`}
              className="rounded-lg border-2"
            />
            <div
              className="w-3/5 border-2 rounded-lg border-blue-500 flex flex-col justify-evenly
   
            "
            >
              <h2 className="text-white text-center text-1xl lg:text-3xl font-bold">
                {data?.title}
              </h2>
              <div className="flex flex-row justify-evenly items-center border-2 border-red-500 w-1/6 self-center text-md lg:text-1xl">
                <button className="border-2 border-yellow-300 p-.8">
                  {data?.rating}
                </button>
                <p>{data?.year}, </p>
                <p>{/* {data?.categories[0]}/{data?.categories[1]}, */}</p>
                <p> {data?.runtime}</p>
              </div>
              <div className="flex flex-row justify-around mt-2 ">
                <div className="flex flex-col items-center content-center">
                  <h2 className="text-white text-center text-xl lg:text-1xl font-light">
                    IMDB
                  </h2>
                  <div className="flex flex-row justify-around items-center content-center">
                    <Image src={imdb} width={50} height={50} alt="IMDB Logo" />
                    <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                      {data?.imdbRating * 10}%
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
                      {data?.metascore}%
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
            {/* <div>review form will go here</div> */}
            <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
              Movie Info
            </h2>
            <div className="ml-5 text-white text-l lg:text-2xl font-light font ">
              <p className="m-2">{data?.summary}</p>
              <h2>
                <span className="font-light text-yellow-300 m-2">Rating:</span>
                {data?.rating}
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
                {data?.director}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">Writer:</span>
                {data?.writer}{" "}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">
                  Release Date:
                </span>
                {data?.releaseDate}{" "}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">
                  Box Office:
                </span>
                ${data?.boxOffice}
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">Runtime:</span>
                {data?.runtime}
              </h2>
              {/* <h2><span>Cast:</span>{data?.director} </h2> */}
            </div>
            <br></br>
            <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
              Movie Social Reviews
            </h2>
          </section>
          {/* <div>other reviews will go here</div> */}
        </section>
      </section>
    </main>
  );
};

export default MovieDetails;
