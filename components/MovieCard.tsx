interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <main className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
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
      <section
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
      </section>
    </main>
  );
};
export default MovieCard;
