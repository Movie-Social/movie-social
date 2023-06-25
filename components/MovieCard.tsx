import { BsFillPlayFill, BsFillInfoCircleFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useInfoModal from "@/hooks/useInfoModal";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <main className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        onClick={handleOpenModal}
        className="
      cursor-pointer
      object-fill
      transition
      duration
      shadow-xl
      rounded-md
      group-hover:opacity-90
      sm:group-hover:opacity-0
      delay-300
      w-full
      h-[30vw]
      "
        src={data.poster}
        alt="Movie poster"
      />
      <div
        className="
      opacity-0
      absolute
      top-0
      transition
      duration-200
      z-10
      invisible
      sm:visible
      delay-300
      w-full
      scale-0
      group-hover:scale-110
      group-hover:-translate-y-[6vw]
      group-hover:-translate-x-[2vw]
      group-hover:opacity-100
      "
      >
        <img
          className="
        cursor-pointer
        object-fill
        transition
        duration
        shadow-xl
        rounded-t-md
        w-full
        h-[30vw]
        "
          src={data.poster}
          alt="thumbnail"
        />
        <section
          className="
        z-10
        bg-zinc-800
        p-2
        lg:p-4
        absolute
        w-full
        transition
        shadow-md
        rounded-b-md
        "
        >
          <div
            className="
flex flex-row items-center gap-3
"
          >
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="
            cursor-pointer
            w-6
            h-6
            lg:w-10
            lg:h-10
            bg-white
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:bg-neutral-300
            "
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data?.id} />
            <BsFillInfoCircleFill size={30} onClick={handleOpenModal} />
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.title}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              Rating: {data.score}
            </p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <button className="text-white text-[10px] lg:text-sm">
              {data.categories[0]}
            </button>
            <button className="text-white text-[10px] lg:text-sm">
              {data.categories[1]}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};
export default MovieCard;
