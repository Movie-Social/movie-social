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
  const [currents, setCurrents] = useState([]);

  useEffect(() => {
    const fetchCurrents = async () => {
      const list = await tmdbFetcher("now_playing");
      const englishMovies = list.results
        .filter(
          (movie: { original_language: string }) =>
            movie?.original_language === "en"
        )
        .map((movie: any) => movie.title);
      setCurrents(englishMovies);
    };
    fetchCurrents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const apiString = title.toLowerCase().split(" ").join("_");
  useEffect(() => {
    const fetchTMDBLists = async () => {
      const list = await tmdbFetcher(apiString);
      const englishMovies = list.results.filter(
        (movie: any) => movie?.original_language === "en"
      );
      if (title === "Upcoming") {
        const filtered = englishMovies.reduce((acc: any, movie: any) => {
          if (!currents.includes(movie.title)) {
            acc.push(movie);
          }
          return acc;
        }, []);
        setTmdbList(filtered);
        return null;
      }
      setTmdbList(englishMovies);
    };

    fetchTMDBLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isEmpty(tmdbList)) {
    return null;
  }

  // console.log(currents, "CURR");
  console.log(tmdbList, "<<<<<");

  return (
    <main className="flex justify-center w-full self-center px-2 mt-4 space-y-5 md:space-y-7">
      <section className="flex flex-col w-full">
        <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold md:mx-20 my-4">
          {title}
        </h2>
        <div className="md:hidden">
          <Slide
            transitionDuration={1000}
            autoplay={false}
            slidesToScroll={3}
            slidesToShow={3}
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
        </div>
        {/* Small to medium slideshow */}
        <div className="hidden md:block lg:hidden">
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
        </div>
        {/* Slideshow for larger screens */}
        <div className="hidden lg:block">
          <Slide
            transitionDuration={1000}
            autoplay={false}
            slidesToScroll={3}
            slidesToShow={5}
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
        </div>
      </section>
    </main>
  );
};

export default RestfulMovieList;
