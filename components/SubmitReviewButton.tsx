import logger from "@/lib/logger";
import axios from "axios";
import { useCallback } from "react";

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
  const addReview = useCallback(async () => {
    try {
      await axios.post("/api/review", {
        userId,
        rating,
        review,
        title,
        poster,
        usersName,
      });
    } catch (error: any) {
      logger.error(error.message);
    }
  }, [title, poster, review, rating, userId, usersName]);

  return (
    <main
      onClick={addReview}
      className="cursor-pointer w-1/5 m-2 my-10 p-1 bg-yellow-500 rounded-md"
    >
      Submit button
    </main>
  );
};
export default SubmitReviewButton;
