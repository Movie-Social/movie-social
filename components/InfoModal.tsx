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
      flex
      justify-center
      items-center
      fixed
      inset-0
      overflow-x-hidden
      overflow-y-auto
      transition
      duration-300
      bg-black
      bg-opacity-80
      "
    >
      {isLoading ? (
        <LoadingModal />
      ) : (
        <section
          className="
          relative
          lg:w-3/5
          mx-auto
          max-w-3xl
          rounded-md
          overflow-hidden
"
        >
          <div
            className={`${isVisible ? "scale-100" : "scale-0"}
            relative
            flex-auto
            transform
            duration-300
            drop-shadow-md
          bg-zinc-900
        `}
          >
            <div
              className="
              relative
              mb-2
            "
            >
              <YouTube
                videoId={trailer}
                opts={opts}
                className="aspect-w-16 aspect-h-9 sm:aspect-w-4 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9 lg:w-full lg:aspect-h-8"
              />
              <div
                onClick={handleClose}
                className="
                absolute
                top-3
                right-3
                flex
                items-center
                justify-center
                h-10
                w-10
                rounded-full
                cursor-pointer
          bg-black
          bg-opacity-70
        "
              >
                <AiOutlineClose size={20} className="text-white" />
              </div>
            </div>
            <section className="mx-2 pb-3">
              <p
                className="
                text-white
                text-center
                text-2xl
                md:text-3xl
                lg:text-4xl
                font-semibold
                mb-2
              "
              >
                {data?.title}
              </p>
              <div
                className="flex
              flex-row
              gap-3
              items-center
              "
              >
                <FavoriteButton movieId={data?.movieId} />
                <BsFillInfoCircleFill
                  className="text-white cursor-pointer"
                  size={30}
                  onClick={() => router.push(`/movie/${data?.movieId}`)}
                />
              </div>
              <p className="text-white text-lg my-4">{data?.summary}</p>
            </section>
          </div>
        </section>
      )}
    </main>
  );
};

export default InfoModal;
