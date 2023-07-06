import useCurrentUser from "@/hooks/useCurrentUser";
import useReviews from "@/hooks/useReviews";
import axios from "axios";
import { useCallback, useMemo } from "react";

interface SubmitReviewButtonProps {
  movieId: string;
}
const SubmitReviewButton: React.FC<SubmitReviewButtonProps> = ({ movieId }) => {
  const { mutate: mutateReviews } = useReviews();
  const { data: currentUser, mutate } = useCurrentUser();

  const reviewed = useMemo(() => {
    const list = currentUser?.reviewIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

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
  }, [movieId, reviewed, currentUser, mutate, mutateReviews]);
  return (
    <main
      onClick={addReview}
      className="bg-yellow-500 rounded-md p-1 m-2 my-10 cursor-pointer"
    >
      Submit button
    </main>
  );
};
export default SubmitReviewButton;
