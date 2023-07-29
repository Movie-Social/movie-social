import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import useMovie from "@/hooks/useMovie";
import React from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

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
        muted
        controls
        className="h-full w-full"
        src={data?.videoUrl}
      ></video>
    </main>
  );
};
export default Watch;
