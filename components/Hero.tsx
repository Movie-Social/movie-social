import { Key, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//* Without this line of code I will have a hydration error. Why?
import dynamic from "next/dynamic";
import PlayButton from "./PlayButton";
import Image from "next/image";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import RestfulMovieList from "./RestfulMovieList";
import useAllHero from "@/hooks/useAllHero";

interface ShuffleArgs {
  poster: string;
  caption: string;
  title: string;
}

const Hero = () => {
  const allHero = useAllHero();

  const heroOptions = allHero?.data;

  const shuffle = (array: ShuffleArgs[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  const shuffled = shuffle(heroOptions);
  return (
    <main className="lg:w-full lg:h-[100vh] lg:rounded-lg self-center opacity-50 border mb-10 border-blue-700">
      <Slide
        transitionDuration={1000}
        autoplay={true}
        nextArrow={
          <button
            style={{
              cursor: "pointer",
              border: "0px",
              opacity: "90%",
            }}
          >
            <BiSkipNext size={40} className="text-yellow-300" />
          </button>
        }
        prevArrow={
          <button
            style={{
              cursor: "pointer",
              border: "0px",
              opacity: "90%",
            }}
          >
            <BiSkipPrevious size={40} className="text-yellow-300" />
          </button>
        }
      >
        {shuffled.map((slideImage, index) => (
          <div className="relative h-56 lg:h-[100vh] w-full" key={index}>
            <Image
              src={slideImage.poster}
              fill
              priority
              alt={slideImage.caption}
              className="border-2 border-red-200"
            />
            {/* <h2 className="absolute bottom-1 inset-x-1/4 text-center z-10 md:text-5xl text-2xl bold text-gray-200"> */}
            <div className="absolute left-20 top-[35%] text-center z-10 md:text-5xl text-2xl bold text-gray-200">
              <h2>{slideImage.caption.split("Scene from the movie ")[1]}</h2>
            </div>
            <div className="w-full absolute bottom-1 inset-x-1/4 text-center z-10">
              {/* Should make new component? That doesnt have slide effect  */}
              {/* <RestfulMovieList title="Now Playing" /> */}
            </div>
          </div>
        ))}
      </Slide>
    </main>
  );
};
//* Without this line of code I will have a hydration error. Why?
export default dynamic(() => Promise.resolve(Hero), { ssr: false });
