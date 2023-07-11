import tmdbFetcher from "@/lib/tmdbFetcher";
import { useEffect, useState } from "react";
import RestfulMovieCard from "./RestfulMovieCard";
import { Slide } from "react-slideshow-image";

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

  return (
    <main className="px-4 md:px-12 mt-2 space-y-4">
      <section className="flex flex-col content-center">
        <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </h2>
        <Slide
          transitionDuration={1000}
          autoplay={false}
          slidesToScroll={3}
          slidesToShow={5}
          indicators={true}
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
