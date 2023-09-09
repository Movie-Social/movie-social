import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import UpdateReviewButton from "./UpdateReviewButton";

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
      <section className="flex flex-col items-center justify-center md:w-full h-full p-2 m-2 md:m-5 border-2 border-yellow-300 rounded-md">
        <MdOutlineCancel className="text-yellow-300 self-center" size={40} />
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
    </main>
  );
};
export default ExistingReviewForm;
