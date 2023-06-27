import Navbar from "@/components/Navbar";
import useMovie from "@/hooks/useMovie";
import trash from "../../public/images/recyclingBag.png";
import rotten from "../../public/images/rotten.png";
import imdb from "../../public/images/imdb.png";
import meta from "../../public/images/meta.png";
import Image from "next/image";

interface MovieDetailsProps {
  movieId: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId }) => {
  //   change from hardcoded once I add parent ids
  const { data = {} } = useMovie("643dd150ea3c9d361ac2b0be");
  console.log(data, "<<<working?");
  return (
    <main className="text-white text-center">
      {/* <Navbar /> */}
      <section>
        {/* <video></video> */}
        <div>
          <h2>{data?.title}</h2>
          <div className="flex flex-row justify-around">
            <button>{data?.rating}</button>
            <p>{data?.year}</p>
            <p>{data?.runtime}</p>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col">
              <h2>IMDB</h2>
              <div className="flex flex-row justify-around">
                <Image src={imdb} width={30} alt="Symbol for a bad movie" />
                {/* <span>{data?.score}</span> */}
                <p>88%</p>
              </div>
            </div>
            <div className="flex flex-col">
              <h2>Rotten Tomatoes</h2>
              <div className="flex flex-row justify-around">
                <Image src={rotten} width={30} alt="Symbol for a bad movie" />
                {/* <span>{data?.score}</span> */}
                <p>88%</p>
              </div>
            </div>
            <div className="flex flex-col">
              <h2>MetaCritic</h2>
              <div className="flex flex-row justify-around">
                <Image src={meta} width={30} alt="Symbol for a bad movie" />
                {/* <span>{data?.score}</span> */}
                <p>88%</p>
              </div>
            </div>
            <div className="flex flex-col">
              <h2>Movie Social</h2>
              <div className="flex flex-row justify-around">
                <Image src={trash} width={30} alt="Symbol for a bad movie" />
                {/* <span>{data?.score}</span> */}
                <p>88%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;
