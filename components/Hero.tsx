import { Key } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//* Without this line of code I will have a hydration error. Why?
import dynamic from "next/dynamic";
import PlayButton from "./PlayButton";
import Image from "next/image";

interface ShuffleArgs {
  image: string;
  caption: string;
}

const Hero = () => {
  const images = [
    {
      image: "/images/hero/IMG_8084.jpg",
      caption: "Scene from the movie Deadpool",
    },
    {
      image: "/images/hero/IMG_8085.jpg",
      caption: "Scene from the movie Training Day",
    },
    {
      image: "/images/hero/IMG_8086.jpg",
      caption: "Scene from the movie Big Lebowski",
    },
    {
      image: "/images/hero/IMG_8087.jpg",
      caption: "Scene from the movie Moonlight",
    },
    {
      image: "/images/hero/IMG_8088.jpg",
      caption: "Scene from the movie Big Daddy",
    },
    {
      image: "/images/hero/IMG_8089.jpg",
      caption: "Scene from the movie Get Out",
    },
    {
      image: "/images/hero/IMG_8090.jpg",
      caption: "Scene from the movie Guardians of The Galaxy",
    },
    {
      image: "/images/hero/IMG_8091.jpg",
      caption: "Scene from the movie Sicario",
    },
    {
      image: "/images/hero/IMG_8092.jpg",
      caption: "Scene from the movie Precious",
    },
    {
      image: "/images/hero/IMG_8093.jpg",
      caption: "Scene from the movie V for Vendetta",
    },
    {
      image: "/images/hero/IMG_8094.jpg",
      caption: "Scene from the movie The Other Boleyn Girl ",
    },
    {
      image: "/images/hero/IMG_8095.jpg",
      caption: "Scene from the movie Half Baked",
    },
    {
      image: "/images/hero/IMG_8096.jpg",
      caption: "Scene from the movie Super Troopers",
    },
    {
      image: "/images/hero/IMG_8097.jpg",
      caption: "Scene from the movie Road Trip",
    },
    {
      image: "/images/hero/IMG_8098.jpg",
      caption: "Scene from the movie Memento",
    },
    {
      image: "/images/hero/IMG_8099.jpg",
      caption: "Scene from the movie King's Speech",
    },
    {
      image: "/images/hero/IMG_8100.jpg",
      caption: "Scene from the movie Primal Fear",
    },
    {
      image: "/images/hero/IMG_8101.jpg",
      caption: "Scene from the movie Pulp Fiction",
    },
    {
      image: "/images/hero/IMG_8102.jpg",
      caption: "Scene from the movie Focus",
    },
    {
      image: "/images/hero/IMG_8103.jpg",
      caption: "Scene from the movie Chappie",
    },
    {
      image: "/images/hero/IMG_8104.jpg",
      caption: "Scene from the movie Love and Basketball",
    },
    {
      image: "/images/hero/IMG_8105.jpg",
      caption: "Scene from the movie Next Day Air ",
    },
    {
      image: "/images/hero/IMG_8106.jpg",
      caption: "Scene from the movie Baby Boy",
    },
    {
      image: "/images/hero/IMG_8107.jpg",
      caption: "Scene from the movie No Country for Old Men",
    },
    {
      image: "/images/hero/IMG_8108.jpg",
      caption: "Scene from the movie Poetic Justice",
    },
    {
      image: "/images/hero/IMG_8109.jpg",
      caption: "Scene from the movie Juice",
    },
    {
      image: "/images/hero/IMG_8110.jpg",
      caption: "Scene from the movie The Wood",
    },
    {
      image: "/images/hero/IMG_8111.jpg",
      caption: "Scene from the movie A Thin Line Between Love and Hate",
    },
    {
      image: "/images/hero/IMG_8112.jpg",
      caption: "Scene from the movie Forrest Gump",
    },
    {
      image: "/images/hero/IMG_8113.jpg",
      caption: "Scene from the movie Dark Night",
    },
    {
      image: "/images/hero/IMG_8114.jpg",
      caption: "Scene from the movie InterStellar",
    },
    {
      image: "/images/hero/IMG_8115.jpg",
      caption: "Scene from the movie Wolf Of Wall Street",
    },
    {
      image: "/images/hero/IMG_8116.jpg",
      caption: "Scene from the movie Lord of the Rings",
    },
    {
      image: "/images/hero/IMG_8117.jpg",
      caption: "Scene from the movie Braveheart",
    },
    {
      image: "/images/hero/IMG_8118.jpg",
      caption: "Scene from the movie Robinhood Men In Tights",
    },
  ];

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

  const shuffled = shuffle(images);

  return (
    <main className="relative opacity-50">
      <Slide>
        {shuffled.map((slideImage, index) => (
          <div className="relative h-56 lg:h-96 w-full" key={index}>
            <Image
              src={slideImage.image}
              fill
              priority
              alt={slideImage.caption}
            />
            <h2 className="absolute bottom-1 inset-x-1/4 text-center z-10 md:text-5xl text-2xl bold text-white">
              {slideImage.caption.split("Scene from the movie ")[1]}
            </h2>
            {/* <PlayButton movieId="hardcoded" /> */}
          </div>
        ))}
      </Slide>
    </main>
  );
};
//* Without this line of code I will have a hydration error. Why?
export default dynamic(() => Promise.resolve(Hero), { ssr: false });
