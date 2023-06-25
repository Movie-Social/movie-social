import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import useMovie from "@/hooks/useMovie";
import React from "react";
import { useRouter } from "next/router";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);

  return (
    <main
      className="
  h-screen
  w-screen
  bg-black
  "
    >
      <nav
        className="
      fixed
      w-full 
      p-4
      z-10
      flex
      flex-row
      items-center
      gap-8
      bg-black
      bg-opacity-70
      "
      >
        <BsFillArrowLeftCircleFill
          onClick={() => router.push("/")}
          size={40}
          className="text-white cursor-pointer"
        />
        <p className="text-white text-1xl lg:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        // src={data?.videoUrl}
        src="https://www.dailymotion.com/video/x2pi3xi"
      ></video>
    </main>
  );
};
export default Watch;
