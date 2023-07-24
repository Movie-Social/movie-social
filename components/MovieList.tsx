import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { Slide } from "react-slideshow-image";
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
    <main className="px-2 mt-2 space-y-4 flex justify-center">
      <section className="flex flex-col content-center w-full">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
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
      </section>
    </main>
  );
};
export default MovieList;
