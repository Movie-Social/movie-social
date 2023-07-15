import Image from "next/image";
import loadingGif from "../public/images/loading.gif";
import trash from "../public/images/recyclingBag.png";
const LoadingModal = () => {
  return (
    <section
      className="
      border-2
      border-blue-700
relative
w-auto
mx-auto
w-[40vw]
h-[40vh]
 bg-zinc-900
rounded-md
"
    >
      <Image
        src={trash}
        alt="Custom GIf of movie social logo rumbling while the data loads"
        fill
      />
    </section>
  );
};
export default LoadingModal;
