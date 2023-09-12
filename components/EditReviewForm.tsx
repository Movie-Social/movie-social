import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import UpdateReviewButton from "./UpdateReviewButton";
import ExistingReviewCard from "./ExistingReviewCard";
import { BiUserCircle } from "react-icons/bi";

interface ExistingReviewFormProps {
  review: string;
  rating: number;
  name: string;
}
const ExistingReviewForm: React.FC<ExistingReviewFormProps> = ({
  rating,
  review,
  name,
}) => {
  const [updatedReview, setUpdatedReview] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setUpdatedReview(value);
  };

  return (
    <main className="flex flex-col items-center w-full h-full">
      {!updating ? (
        <>
          <section className="flex flex-col items-center justify-center w-full h-full p-2 m-2 md:m-5 border-2 border-yellow-300 rounded-md">
            <div className="cursor-pointer" onClick={() => setUpdating(true)}>
              <MdOutlineCancel
                className="text-yellow-300 self-center"
                size={20}
              />
            </div>
            {
              <textarea
                placeholder="Update your review"
                value={updatedReview}
                onChange={handleChange}
                className="w-full h-full text-center overflow-hidden md:text-xl lg:text-xl text-white bg-transparent my-3 rounded-md"
              />
            }
            <UpdateReviewButton
              oldReview={review}
              updatedReview={updatedReview}
              name={name}
            />
          </section>
          <section className="flex flex-row justify-center content-center self-center mb-5 w-full">
            <BiUserCircle className="text-white mx-2" size={30} />
            <p className="text-yellow-300 md:text-xl lg:text-2xl">{name}</p>
          </section>
        </>
      ) : (
        <main className=" w-full">
          <ExistingReviewCard review={review} rating={rating} name={name} />
        </main>
      )}
    </main>
  );
};
export default ExistingReviewForm;
