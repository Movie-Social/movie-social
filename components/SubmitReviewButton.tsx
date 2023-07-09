import useCurrentUser from "@/hooks/useCurrentUser";
import useReviews from "@/hooks/useReviews";
import logger from "@/lib/logger";
import axios from "axios";
import { useCallback, useMemo } from "react";

interface SubmitReviewButtonProps {
  movieId: string;
  rating: number;
  review: string;
  userId: string;
  title: string;
}

const SubmitReviewButton: React.FC<SubmitReviewButtonProps> = ({
  movieId,
  rating,
  review,
  userId,
  title,
}) => {
  //   const { mutate: mutateReviews } = useReviews();
  const { data: currentUser, mutate } = useCurrentUser();

  //   const reviewed = useMemo(() => {
  //     const list = currentUser?.reviewIds || [];
  //     return list.includes(movieId);
  //   }, [currentUser, movieId]);

  const addReview = useCallback(async () => {
    try {
      await axios.post("/api/review", {
        movieId,
        userId,
        rating,
        review,
        title,
      });
    } catch (error: any) {
      logger.error(error.message);
    }

    // const updatedReviewIds = response?.data?.reviewIds;

    // mutate({
    //   ...currentUser,
    //   reviewIds: updatedReviewIds,
    // });

    // mutateReviews();
    // console.log("user", currentUser);
    // console.log("user reviews", currentUser?.reviews);
  }, [movieId, title, review, rating, userId, movieId]);
  console.log("Review data title", title);
  console.log("Review data movieID", movieId);
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
