import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps {
  visible: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisisble] = useState(!!visible);
  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);
  const router = useRouter();

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

  console.log(data, "modaldata");
  console.log(data?.movieId, "movieID");
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
              src={data?.videoUrl}
            ></video> */}
            <img
              className="
            
            w-full
            brightness-[60%]
            object-fit
            h-full
            "
              src={data?.poster}
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
                <PlayButton movieId={data?.movieId} />
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
            {/* <p
              className="text-green-400 font-semibold
            text-lg"
            >
              New
            </p> */}
            <p className="text-white text-lg">{data?.runtime}</p>
            <p className="text-white text-lg">Rated: {data?.rating}</p>
            {/* <p className="text-white text-lg">{data?.reviewCount}</p> */}
            {/* <p className="text-white text-lg">{data?.trailer}</p> */}
            {/* <p className="text-white text-lg">{data?.genre}</p> */}
            <p className="text-white text-lg">{data?.summary}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InfoModal;
