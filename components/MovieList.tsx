import { isEmpty } from "lodash";
import { Slide } from "react-slideshow-image";
import MovieCard from "./MovieCard";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

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
            {title === "My Watchlist" &&
              data.map((movie) => <MovieCard key={movie.id} data={movie} />)}
            {title !== "My Favorites"
              ? data
                  .filter((movie) => movie.categories[0] === title)
                  .map((movie) => <MovieCard key={movie.id} data={movie} />)
              : data.map((movie) => <MovieCard key={movie.id} data={movie} />)}
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
            {title === "My Watchlist" &&
              data.map((movie) => <MovieCard key={movie.id} data={movie} />)}
            {title !== "My Favorites"
              ? data
                  .filter((movie) => movie.categories[0] === title)
                  .map((movie) => <MovieCard key={movie.id} data={movie} />)
              : data.map((movie) => <MovieCard key={movie.id} data={movie} />)}
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
            {title === "My Watchlist" &&
              data.map((movie) => <MovieCard key={movie.id} data={movie} />)}
            {title !== "My Favorites"
              ? data
                  .filter((movie) => movie.categories[0] === title)
                  .map((movie) => <MovieCard key={movie.id} data={movie} />)
              : data.map((movie) => <MovieCard key={movie.id} data={movie} />)}
          </Slide>
        </div>
      </section>
    </main>
  );
};
export default MovieList;
