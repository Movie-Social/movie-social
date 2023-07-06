import useCurrentUser from "@/hooks/useCurrentUser";
import useReviews from "@/hooks/useReviews";
import axios from "axios";
import { useCallback } from "react";

interface SubmitReviewButtonProps {
  movieId: string;
}
const SubmitReviewButton: React.FC<SubmitReviewButtonProps> = ({ movieId }) => {
  const { mutate: mutateReviews } = useReviews();
  const { data: currentUser, mutate } = useCurrentUser();

  const addReview = useCallback(async () => {
    const response = await axios.post("/api/review", { movieId });
    const updatedReviewIds = response?.data?.reviewIds;

    mutate({
      ...currentUser,
      reviewIds: updatedReviewIds,
    });

    mutateReviews();
    console.log("user", currentUser);
    console.log("user reviews", currentUser?.reviews);
  }, [movieId, currentUser, mutate, mutateReviews]);
  return (
    <main
      onClick={addReview}
      className="cursor-pointer
      m-10
group/item
w-6
h-6
lg:w-8
lg:h-8
border-white
border-2
rounded-full
flex
justify-center
items-center
transition
hover:border-neutral-300
"
    >
      Submit button
    </main>
  );
};
export default SubmitReviewButton;
