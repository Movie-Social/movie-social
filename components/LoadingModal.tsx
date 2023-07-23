import Image from "next/image";
import loadingGif from "../public/images/loading.gif";
const LoadingModal = () => {
  return (
    <section
      className="
      opacity-60
      border-2
      border-yellow-300
relative
w-auto
mx-auto
w-[40vw]
h-[40vh]
 bg-zinc-900
rounded-md
flex
flex-col
justify-center
content-center
items-center
"
    >
      <h2 className="text-white text-center text-3xl">Loading...</h2>
      <Image
        className="rounded-full"
        src={loadingGif}
        alt="Custom GIf of movie social logo rumbling while the data loads"
        height={300}
        width={300}
      />
    </section>
  );
};
export default LoadingModal;
