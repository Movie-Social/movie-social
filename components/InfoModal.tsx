import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import FavoriteButton from "./FavoriteButton";
import LoadingModal from "./LoadingModal";
import trailerFetcher from "@/lib/trailerFetcher";
import YouTube, { YouTubeProps } from "react-youtube";
import { tmdbProps } from "@/pages/movie/tmdb/[restfulDetails]";
import tmdbMovieFetcher from "@/lib/tmdbMovieFetcher";

interface InfoModalProps {
  visible: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisisble] = useState(!!visible);
  const { movieId } = useInfoModal();
  const { data = {}, isLoading } = useMovie(movieId);
  const [tmdb, setTmdb] = useState<tmdbProps>();
  const [trailer, setTrailer] = useState();

  const router = useRouter();

  useEffect(() => {
    const fetchTmdb = async () => {
      data?.title;
      const tmdbDetails = await tmdbMovieFetcher(data?.title);
      const details = tmdbDetails?.results
        .filter((movie: any) => movie.original_language === "en")
        .sort((a: any, b: any) => b.popularity - a.popularity)[0];
      setTmdb(details);
    };
    fetchTmdb();
  }, [data?.title]);

  useEffect(() => {
    setIsVisisble(!!visible);
  }, [visible]);

  useEffect(() => {
    const fetchTrailer = async () => {
      const trailer = await trailerFetcher(tmdb?.id as string);
      if (trailer?.results?.length > 0) {
        const youtubeKey = trailer.results
          .filter((video: any) => video.type === "Trailer")
          .filter((video: any) => video.site === "YouTube")[0].key;
        setTrailer(youtubeKey);
      }
    };

    fetchTrailer();
  }, [trailer, tmdb?.id]);

  const handleClose = useCallback(() => {
    setIsVisisble(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <main
      onClick={handleClose}
      className="
  z-50
  transition
  duration-300
  bg-black
  bg-opacity-80
  flex
justify-center
items-center
overflow-x-hidden
overflow-y-auto
fixed
inset-0
  "
    >
      {isLoading ? (
        <LoadingModal />
      ) : (
        <section
          className="
relative
w-auto
mx-auto
max-w-3xl
rounded-md
overflow-hidden
"
        >
          <div
            className={`${isVisible ? "scale-100" : "scale-0"}
        transform
        duration-300
        relative
        flex-auto
        bg-zinc-900
        drop-shadow-md
        `}
          >
            <div
              className="
            relative
            h-96
            "
            >
              <YouTube
                videoId={trailer}
                opts={opts}
                onReady={onPlayerReady}
                className="aspect-w-16 aspect-h-9 sm:aspect-w-4 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9 lg:w-full lg:aspect-h-8"
              />
              <div
                onClick={handleClose}
                className="
        cursor-pointer
        absolute
        top-3
        right-3
        h-10
        w-10
        rounded-full
        bg-black
        bg-opacity-70
        flex
        items-center
justify-center
        "
              >
                <AiOutlineClose size={20} className="text-white" />
              </div>
              <div
                className="
            absolute
            bottom-[10%]
            left-10
            "
              >
                <p
                  className="
              text-white
              text-3xl
              md:text-4xl
              h-full
              lg:text-5xl
              font-bold
              mb-8
              "
                >
                  {data?.title}
                </p>
                <div
                  className="flex
              flex-row
              gap-4
              items-center
              "
                >
                  {/* <PlayButton movieId={data?.movieId} /> */}
                  <FavoriteButton movieId={data?.movieId} />
                  <BsFillInfoCircleFill
                    className="text-white cursor-pointer"
                    size={30}
                    onClick={() => router.push(`/movie/${data?.movieId}`)}
                  />
                </div>
              </div>
            </div>
            <div
              className="px-12
          py-8"
            >
              <p className="text-white text-lg">{data?.runtime}</p>
              <p className="text-white text-lg">Rated: {data?.rating}</p>
              {/* <p className="text-white text-lg">{data?.trailer}</p> */}
              {/* <p className="text-white text-lg">{data?.genre}</p> */}
              <p className="text-white text-lg">{data?.summary}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default InfoModal;
