import logger from "@/lib/logger";
import axios from "axios";
import { useCallback } from "react";

interface SubmitReviewButtonProps {
  rating: number;
  review: string;
  userId: string;
  title: string;
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
      className="bg-yellow-500 rounded-md p-1 m-2 my-10 cursor-pointer"
    >
      Submit button
    </main>
  );
};
export default SubmitReviewButton;
