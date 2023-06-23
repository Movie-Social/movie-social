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
        src="https://imdb-video.media-imdb.com/vi1016775449/1434659607842-pgv4ql-1633897968257.mp4?Expires=1687646991&Signature=kOcRC99rU-bbezrlGOjEbFMyfpHn-OBVwJymB6mCKpDoOCDLMo8L0A7XWeumuOoWx2CbjgkobjFUGN5ezMzAp2ec0OpsDnPvRugC~wDucqHjAUuRflDDY-PFKVGdmrAL3j55LI4avg294H9kDxKRQ8P6Ko0r-iqVz27bKujvZ2sIR757Ckemr~o33fvL3MN~-EL2hL4sk0R8N21DhxTWA~rQYdygaYMD6J4rYaI2L12VZ3EALqxr7QVQW-2TAfhNId2Si0kuNdUOgS7ArOEr7tUXuAvEyzRkA6G6XS3USXzofM6wWtrOxEdGn2aA5k-u~JB5pVLXyIZP7pM-BQ6G6g__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
      ></video>
    </main>
  );
};
export default Watch;
