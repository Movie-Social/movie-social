import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
interface ExistingReviewCardProps {
  review: string;
  rating: number;
  name: string;
}
const ExistingReviewCard: React.FC<ExistingReviewCardProps> = ({
  rating,
  review,
  name,
}) => {
  return (
    <main>
      <section className="flex flex-col items-center p-2 m-2 border-2 border-yellow-300 rounded-md">
        <div className="flex flex-row justify-center items-center content-center">
          <Image
            alt="Movie Social logo"
            className="ml-2 rounded-full"
            src="/images/newLogo.png"
            width={40}
            height={30}
          />
          <h2 className="text-lg lg:text-xl font-semibold ml-5">{review}</h2>
        </div>
        {rating === 0 ? (
          <h2 className="text-lg lg:text-xl font-semibold">Rating: N/A</h2>
        ) : (
          <h2 className="text-lg lg:text-xl font-semibold">
            Rating: {rating}/5
          </h2>
        )}
      </section>
      <section className="flex flex-row justify-center items-center">
        <BiUserCircle className="text-white mx-2" size={40} />
        <p className="text-yellow-300 text-xl lg:text-2xl">{name}</p>
      </section>
    </main>
  );
};
export default ExistingReviewCard;
