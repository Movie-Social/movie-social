import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import tmdbDetailsFetcher from "@/lib/tmdbDetailsFetcher";
import useRestfulInfoModal from "@/hooks/useRestfulInfoModal";
import trailerFetcher from "@/lib/trailerFetcher";
import YouTube, { YouTubeProps } from "react-youtube";

interface InfoModalProps {
  visible: boolean;
  onClose: any;
}

interface DetailProps {
  title: string;
  poster_path: string;
  movieId: string | any;
  runtime: string;
  rating: string;
  overview: string;
  release_date: string;
  genres: Genre[];
  id: number;
}

type Genre = {
  id: string;
  name: string;
};

const RestfulInfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisisble] = useState(!!visible);
  const { movieId } = useRestfulInfoModal();
  const [details, setDetails] = useState<DetailProps>();
  const [trailer, setTrailer] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchTmdb = async () => {
      const tmdbDetails = await tmdbDetailsFetcher(movieId);
      setDetails(tmdbDetails);
    };
    fetchTmdb();
  }, [movieId]);

  useEffect(() => {
    const fetchTrailer = async () => {
      const trailer = await trailerFetcher(details?.id?.toString() as string);
      if (trailer?.results?.length > 0) {
        const youtubeKey = trailer.results
          .filter((video: any) => video.type === "Trailer")
          .filter((video: any) => video.site === "YouTube")[0].key;
        setTrailer(youtubeKey);
      }
    };

    fetchTrailer();
  }, [trailer, details?.id]);

  useEffect(() => {
    setIsVisisble(!!visible);
  }, [visible]);

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
      mute: 1,
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
          <section className="mx-2 pb-1">
            <p
              className="
              cursor-pointer
              text-white
              text-center
              text-2xl
              md:text-3xl
              lg:text-4xl
              font-semibold
              mb-2
              hover:text-yellow-300 transition
              "
              onClick={() => router.push(`/movie/tmdb/${details?.id}`)}
            >
              {details?.title}
            </p>
            <div
              className="flex
              flex-row
              gap-3
              items-center
              "
            >
              <BsFillInfoCircleFill
                className="text-yellow-300 cursor-pointer"
                size={30}
                onClick={() => router.push(`/movie/tmdb/${details?.id}`)}
              />
            </div>
            <p className="text-white text-lg my-4">{details?.overview}</p>
          </section>
        </div>
      </section>
    </main>
  );
};

export default RestfulInfoModal;
