import Image from "next/image";
interface ExistingReviewCardProps {
  review: string;
  rating: number;
}
const ExistingReviewCard: React.FC<ExistingReviewCardProps> = ({
  rating,
  review,
}) => {
  return (
    <main className="border-2 border-yellow-500 m-2 w-[50%]">
      <div className="flex flex-row">
        <Image
          alt="Movie Social logo"
          className="ml-2"
          src="/images/socialLogo.png"
          width={50}
          height={50}
        />
        <h2 className="ml-5">{review}</h2>
      </div>
      <h2>{rating}/5</h2>
    </main>
  );
};
export default ExistingReviewCard;
