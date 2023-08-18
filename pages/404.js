import Image from "next/image";
import movie404 from "../public/images/movie404.gif";
import gmail from "../public/images/gmail.png";
const ErrorPage = () => {
  return (
    <main className="flex flex-col justify-center w-full h-full text-white px-3">
      <h2 className="text-center lg:text-3xl">
        If you have reached this page you caught the developer{" "}
        <span className="text-yellow-300 font-light">
          {"(Kendall McGree) "}
        </span>
        slipping 🤦🏾‍♂️
      </h2>
      <Image
        src={movie404}
        alt="Gif of John Travolta looking for the internet connection"
        className="w-4/5 lg:w-5/12 self-center my-4 rounded-lg"
      />
      <h1 className="text-center text-xl lg:text-3xl text-yellow-300 font-semibold">
        Two Options
      </h1>
      <h2 className="text-center lg:text-2xl">
        <span className="text-yellow-300 font-light">{"A.)"}</span> Help me by
        not doing whatever you did to get here again. This method will help me
        not look bad on my own app 😂
      </h2>
      <br></br>
      <h2 className="text-center lg:text-2xl">
        <span className="text-yellow-300 font-light">{"B.)"}</span> Reach out
        and help troubleshoot this puppy with me....{" "}
        <a href="mailto:mcgreekendall@gmail.com">
          <Image src={gmail} width={50} height={50} className="inline" />
        </a>
      </h2>
    </main>
  );
};

export default ErrorPage;
