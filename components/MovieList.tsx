import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <main className="px-4 md:px-12 mt-2 space-y-4">
      <section>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-5 gap-2 mb-24 md:mb-48 lg:mb-96">
          {title !== "My Favorites"
            ? data
                .filter((movie) => movie.categories[0] === title)
                .map((movie) => <MovieCard key={movie.id} data={movie} />)
            : data.map((movie) => <MovieCard key={movie.id} data={movie} />)}
        </div>
      </section>
    </main>
  );
};
export default MovieList;
