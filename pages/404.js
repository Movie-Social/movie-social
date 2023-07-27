import Image from "next/image";
import movie404 from "../public/images/movie404.gif";
const ErrorPage = () => {
  return (
    <main className="flex flex-col justify-center w-full h-full text-white border border-red-500">
      <h2 className="text-center">
        If you have reached this page you caught the developer (Kendall McGree)
        off his game 🤦🏾‍♂️
      </h2>
      <Image
        src={movie404}
        alt="Gif of John Travolta looking for the internet connection"
        className="w-4/5 self-center my-4"
      />
      <h1 className="text-center text-2xl lg:text-3xl text-yellow-300 font-semibold">
        Two Options
      </h1>
      <h2 className="text-center">
        <span className="text-yellow-300 font-light">{"A.)"}</span> Help me by
        not doing whatever you did to get here. This method will help me not
        look bad on my own app
      </h2>
      <br></br>
      <h2 className="text-center">
        <span className="text-yellow-300 font-light">{"B.)"}</span> Help
        troubleshoot this puppy with me....
      </h2>
    </main>
  );
};

export default ErrorPage;
