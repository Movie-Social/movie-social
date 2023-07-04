import tmdbFetcher from "@/lib/tmdbFetcher";
import { useEffect, useState } from "react";
import RestfulMovieCard from "./RestfulMovieCard";

interface RestfulMovieListProps {
  title: string;
}

const RestfulMovieList: React.FC<RestfulMovieListProps> = ({ title }) => {
  const [tmdbList, setTmdbList] = useState([]);

  const apiString = title.toLowerCase().split(" ").join("_");
  useEffect(() => {
    const fetchTMDBLists = async () => {
      const list = await tmdbFetcher(apiString);
      setTmdbList(list.results);
    };

    fetchTMDBLists();
  }, []);
  if (!tmdbList) {
    return null;
  }

  console.log(tmdbList[0]?.title, "NP");
  return (
    <main className="px-4 md:px-12 mt-2 space-y-4">
      <section>
        <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </h2>
        <div className="grid grid-cols-5 gap-2 mb-24 md:mb-48 lg:mb-96">
          {tmdbList.map((movie: any) => {
            return <RestfulMovieCard key={movie.id} data={movie} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default RestfulMovieList;
