import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";

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
            <video
              autoPlay
              muted
              loop
              className="
            
            w-full
            brightness-[60%]
            object-cover
            h-full
            "
              //   src={data?.videoUrl}
              src="https://imdb-video.media-imdb.com/vi1016775449/1434659607842-pgv4ql-1633897968257.mp4?Expires=1687646991&Signature=kOcRC99rU-bbezrlGOjEbFMyfpHn-OBVwJymB6mCKpDoOCDLMo8L0A7XWeumuOoWx2CbjgkobjFUGN5ezMzAp2ec0OpsDnPvRugC~wDucqHjAUuRflDDY-PFKVGdmrAL3j55LI4avg294H9kDxKRQ8P6Ko0r-iqVz27bKujvZ2sIR757Ckemr~o33fvL3MN~-EL2hL4sk0R8N21DhxTWA~rQYdygaYMD6J4rYaI2L12VZ3EALqxr7QVQW-2TAfhNId2Si0kuNdUOgS7ArOEr7tUXuAvEyzRkA6G6XS3USXzofM6wWtrOxEdGn2aA5k-u~JB5pVLXyIZP7pM-BQ6G6g__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
              // poster={data?.poster}
              poster="https://m.media-amazon.com/images/I/91BHOtTuGUL._AC_UY218_.jpg"
            ></video>
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
                {/* Once I have reference IDs for the parent movie collection I can use that id instead below */}
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
                <BsFillInfoCircleFill
                  className="text-white"
                  size={30}
                  // onClick={handleOpenModal}
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
            <p className="text-white text-lg">{data?.year}</p>
            <p className="text-white text-lg">{data?.runtime}</p>

            <p className="text-white text-lg">{data?.rating}</p>
            <p className="text-white text-lg">{data?.reviewCount}</p>

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
