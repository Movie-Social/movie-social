import Image from "next/image";
import "react-slideshow-image/dist/styles.css";
import { useRouter } from "next/router";
import { Slide } from "react-slideshow-image";
import { images } from "@/lib/heroData";
import { useEffect, useState } from "react";

interface ShuffleArgs {
  id: number;
  image: string;
  caption: string;
}

const Hero = () => {
  const router = useRouter();
  const [shuffled, setShuffled] = useState<ShuffleArgs[]>();

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

  useEffect(() => {
    const heroImages = shuffle(images);
    setShuffled(heroImages);
  }, []);

  return (
    <main className="relative lg:w-full lg:h-[80vh] self-center opacity-50">
      <Slide>
        {shuffled?.map((slideImage, index) => (
          <div className="relative h-56 lg:h-[100vh] w-full" key={index}>
            <Image
              src={slideImage.image}
              fill
              priority
              alt={slideImage.caption}
            />
            <div className="absolute inset-x-1/4 top-7 text-center z-10 md:text-5xl text-2xl bold text-white">
              <button>
                <h2
                  onClick={() => router.push(`/movie/tmdb/${slideImage.id}`)}
                  className="bg-black bg-clip-text cursor-pointer"
                >
                  {slideImage.caption.split("Scene from the movie ")[1]}
                </h2>
              </button>
            </div>
          </div>
        ))}
      </Slide>
    </main>
  );
};
export default Hero;
