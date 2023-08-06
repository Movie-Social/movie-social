import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import tmdbDetailsFetcher from "@/lib/tmdbDetailsFetcher";
import FavoriteButton from "./FavoriteButton";
import useRestfulInfoModal from "@/hooks/useRestfulInfoModal";
import PlayButton from "./PlayButton";
import LoadingModal from "./LoadingModal";

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
  summary: string;
}

const RestfulInfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisisble] = useState(!!visible);
  const { movieId } = useRestfulInfoModal();
  const [details, setDetails] = useState<DetailProps>();
  const router = useRouter();

  useEffect(() => {
    const fetchTmdb = async () => {
      const tmdbDetails = await tmdbDetailsFetcher(movieId);
      setDetails(tmdbDetails);
    };
    fetchTmdb();
  }, [movieId]);

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
            {/* <video
              autoPlay
              muted
              loop
              className="
            
            w-full
            brightness-[60%]
            object-cover
            h-full
            "
              src={details?.videoUrl}
            ></video> */}
            <Image
              className="
            brightness-[60%]
            "
              fill
              src={`https://image.tmdb.org/t/p/original/${details?.poster_path}`}
              alt={`${details?.title}'s movie cover`}
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
                {details?.title}
              </p>
              <div
                className="flex
              flex-row
              gap-4
              items-center
              "
              >
                {/* <PlayButton movieId={details?.movieId} /> */}
                <FavoriteButton movieId={details?.movieId} />
                <BsFillInfoCircleFill
                  className="text-white cursor-pointer"
                  size={30}
                  onClick={() => router.push(`/movie/${details?.movieId}`)}
                />
              </div>
            </div>
          </div>
          <div
            className="px-12
          py-8"
          >
            <p className="text-white text-lg">{details?.runtime}</p>
            <p className="text-white text-lg">Rated: {details?.rating}</p>
            {/* <p className="text-white text-lg">{details?.trailer}</p> */}
            {/* <p className="text-white text-lg">{details?.genre}</p> */}
            <p className="text-white text-lg">{details?.summary}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RestfulInfoModal;
