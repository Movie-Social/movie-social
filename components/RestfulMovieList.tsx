import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import tmdbFetcher from "@/lib/tmdbFetcher";
import RestfulMovieCard from "./RestfulMovieCard";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

interface RestfulMovieListProps {
  title: string;
}

const RestfulMovieList: React.FC<RestfulMovieListProps> = ({ title }) => {
  const [tmdbList, setTmdbList] = useState([]);

  const apiString = title.toLowerCase().split(" ").join("_");
  useEffect(() => {
    const fetchTMDBLists = async () => {
      const list = await tmdbFetcher(apiString);
      const englishMovies = list.results.filter(
        (movie) => movie?.original_language === "en"
      );
      setTmdbList(englishMovies);
    };

    fetchTMDBLists();
  }, []);
  if (isEmpty(tmdbList)) {
    return null;
  }

  return (
    <main className="px-2 mt-2 space-y-4 flex justify-center">
      <section className="flex flex-col content-center w-full">
        <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </h2>
        <Slide
          transitionDuration={1000}
          autoplay={false}
          slidesToScroll={3}
          slidesToShow={4}
          indicators={true}
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
          {tmdbList.map((movie: any) => {
            return <RestfulMovieCard key={movie.id} data={movie} />;
          })}
        </Slide>
      </section>
    </main>
  );
};

export default RestfulMovieList;
