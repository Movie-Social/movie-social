import logger from "@/lib/logger";
import axios from "axios";
import { useCallback } from "react";
import useAllReviews from "@/hooks/useAllReviews";
import { mutate } from "swr";

interface SubmitReviewButtonProps {
  rating: number;
  review: string;
  userId: string;
  title: string | undefined;
  poster: string;
  usersName: string;
}

const SubmitReviewButton: React.FC<SubmitReviewButtonProps> = ({
  rating,
  review,
  userId,
  title,
  poster,
  usersName,
}) => {
  const allReviews = useAllReviews();
  const { mutate: mutateReviews } = useAllReviews();

  const addReview = useCallback(async () => {
    try {
      const response = await axios.post("/api/review", {
        userId,
        rating,
        review,
        title,
        poster,
        usersName,
      });
      const updatedReviews = response?.data;
      mutate({
        ...allReviews,
        updatedReviews,
      });
      mutateReviews();
    } catch (error: any) {
      logger.error(error.message);
    }
  }, [title, poster, review, rating, userId, usersName]);

  return (
    <main
      onClick={addReview}
      className="cursor-pointer md:w-1/5 text-center m-2 p-1 bg-yellow-500 rounded-md"
    >
      Submit
    </main>
  );
};
export default SubmitReviewButton;
