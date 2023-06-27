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
    <main className="text-white">
      {/* <Navbar /> */}
      <section>
        {/* <video></video> */}
        <section>
          <h2 className="text-center">{data?.title}</h2>
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
          <h2 className="border-left-yellow border-l-2 mx-2 px-5">
            RATE AND REVIEW
          </h2>
          {/* <div>review form will go here</div> */}
          <h2 className="border-left-yellow border-l-2 mx-2 px-5">
            Movie Info
          </h2>
          <div>
            <p>{data?.summary}</p>
            <h2>Rating: {data?.rating}</h2>
            <h2>Genre/ catrgories: </h2>
            <h2>Director: {data?.director}</h2>
            <h2>Writer: </h2>
            <h2>Release Date: </h2>
            <h2>Box Office: </h2>
            <h2>Cast: </h2>
          </div>
          <h2 className="border-left-yellow border-l-2 mx-2 px-5">
            Movie Social Reviews
          </h2>
          {/* <div>other reviews will go here</div> */}
        </section>
      </section>
    </main>
  );
};

export default MovieDetails;
