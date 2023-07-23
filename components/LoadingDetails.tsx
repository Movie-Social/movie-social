import Image from "next/image";
import trash from "../public/images/recyclingBag.png";
import rotten from "../public/images/rotten.png";
import imdb from "../public/images/imdb.png";
import rickRoll from "../public/images/rickRoll.jpg";
import roll from "../public/images/rollin.gif";
import meta from "../public/images/meta.png";

const LoadingDetails = () => {
  return (
    <main className="text-white flex justify-center">
      <section className="border-2 w-[90vw] h-full">
        <div className="mt-3 mb-5 flex justify-center">
          <Image
            src={roll}
            width={500}
            height={30}
            alt="The goat Rick Astley hitting the goated rick roll whilst rocking all blue jean denim"
          />
        </div>
        <section>
          <div className="flex flex-row justify-evenly h-[40vh]">
            <Image
              priority
              width={350}
              height={20}
              src={rickRoll}
              alt={`Rick Roll movie poster`}
              className="rounded-lg border border-yellow-300"
            />
            <div className="w-3/5 border-2 rounded-lg border-blue-500 flex flex-col justify-evenly">
              <h2 className="text-white text-center text-1xl lg:text-3xl font-bold">
                Rick Roll
              </h2>
              <div className="flex flex-row justify-evenly items-center border-2 border-red-500 w-1/6 self-center text-md lg:text-1xl">
                <button className="border-2 border-yellow-300 p-.8">
                  R - AF
                </button>
                <p>2009, </p>
                <p>Real</p>
              </div>
              <div className="flex flex-row justify-around mt-2 ">
                <div className="flex flex-col items-center content-center">
                  <h2 className="text-white text-center text-xl lg:text-1xl font-light">
                    IMDB
                  </h2>
                  <div className="flex flex-row justify-around items-center content-center">
                    <Image src={imdb} width={50} height={50} alt="IMDB Logo" />
                    <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                      100%
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
                    <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                      100%
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
                    <p className="text-white text-center text-xl lg:text-2xl font-semibold"></p>
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
                    <p className="text-white text-center text-xl lg:text-2xl font-semibold">
                      100%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="w-[90%] ml-[5%] border-2 self-center mt-5">
            <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
              Movie Info
            </h2>
            <div className="ml-5 text-white text-l lg:text-2xl font-light font ">
              <p className="m-2">
                One Does Not Simply Walk Into The Internet....
              </p>
              <h2>
                <span className="font-light text-yellow-300 m-2">Rating:</span>R
                - AF
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">Genre:</span>
                Comedy
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">
                  Director:
                </span>
                Rick Astley
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">Writer:</span>
                Rick Astley
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">
                  Release Date:
                </span>
                25OCT2009 🙌🏾
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">
                  Box Office:
                </span>
                $Millions
              </h2>
              <h2>
                <span className="font-light text-yellow-300 m-2">Runtime:</span>
                1 hour
              </h2>
            </div>
            <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
              Rate and Review
            </h2>
            <br></br>
          </section>
        </section>
      </section>
    </main>
  );
};
export default LoadingDetails;
