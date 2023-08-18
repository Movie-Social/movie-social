import Image from "next/image";
import movie404 from "../public/images/movie404.gif";

const fiveHundred = () => {
  return (
    <main className="flex flex-col justify-center w-full h-full text-white px-3">
      <h1 className="text-center lg:text-5xl font-bold text-yellow-300">500</h1>
      <h2 className="text-center lg:text-3xl">
        {"Sorry, It's not you. It's me 🤦🏾‍♂️"}
      </h2>
      <Image
        src={movie404}
        alt="Gif of John Travolta looking for the internet connection"
        className="w-4/5 lg:w-5/12 self-center my-4 rounded-lg"
      />
      <h2 className="text-center lg:text-2xl">
        {
          "We're experiencing an internal server problem. Please try again later"
        }
      </h2>
    </main>
  );
};

export default fiveHundred;
