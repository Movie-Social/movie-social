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
      <section className="border-2 border-yellow-500 p-2 m-2 flex flex-col items-center">
        <div className="flex flex-row items-center content-center justify-center">
          <Image
            alt="Movie Social logo"
            className="ml-2 rounded-full"
            src="/images/newLogo.png"
            width={40}
            height={30}
          />
          <h2 className="ml-5">{review}</h2>
        </div>
        {rating === 0 ? <h2>Rating: N/A</h2> : <h2>Rating: {rating}/5</h2>}
      </section>
      <section className="flex flex-row justify-center">
        <BiUserCircle className="text-white" color="white" size={40} />
        <p className="text-yellow-300">{name}</p>
      </section>
    </main>
  );
};
export default ExistingReviewCard;
