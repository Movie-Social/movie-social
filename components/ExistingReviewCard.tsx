import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import useCurrentUser from "@/hooks/useCurrentUser";
import EditReviewButton from "./EditReviewButton";
import { useState } from "react";
import EditReviewForm from "./EditReviewForm";

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
  const currentUser = useCurrentUser();
  const [updating, setUpdating] = useState<boolean>(false);

  const updateReview = () => {
    setUpdating(true);
  };

  return (
    <main className="flex flex-col items-center">
      {!updating ? (
        <section className="flex flex-col items-center justify-center md:w-full h-full p-2 m-2 md:m-5 border-2 border-yellow-300 rounded-md">
          <div className="cursor-pointer" onClick={updateReview}>
            {currentUser?.data?.name === name ? (
              <EditReviewButton review={review} usersName={name} />
            ) : null}
          </div>
          <div className="flex flex-row justify-center items-center content-center">
            <Image
              alt="Movie Social logo"
              className="ml-2 rounded-full"
              src="/images/newLogo.png"
              width={40}
              height={30}
            />
            <h2 className="md:text-lg lg:text-xl ml-5">{review}</h2>
          </div>
          {rating === 0 ? (
            <h2 className="md:text-lg lg:text-xl font-semibold">Rating: N/A</h2>
          ) : (
            <h2 className="md:text-lg lg:text-xl font-semibold mt-4">
              Rating: {rating}/5
            </h2>
          )}
        </section>
      ) : (
        <EditReviewForm review={review} rating={rating} name={name} />
      )}
      <section className="flex flex-row justify-center content-center self-center mb-5 w-full">
        <BiUserCircle className="text-white mx-2" size={30} />
        <p className="text-yellow-300 md:text-xl lg:text-2xl">{name}</p>
      </section>
    </main>
  );
};
export default ExistingReviewCard;
