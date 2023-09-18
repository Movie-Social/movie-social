import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect, useMemo, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import SubmitReviewButton from "./SubmitReviewButton";
import feedback from "../public/images/feedback.png";
import useAllReviews from "@/hooks/useAllReviews";

interface ReviewProps {
  onRating: Function;
  rating: number;
  title: string | undefined;
  poster: string;
}

const Reviewform: React.FC<ReviewProps> = ({
  onRating,
  rating,
  title,
  poster,
}) => {
  const { data: currentUser } = useCurrentUser();
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [reviewed, setReviewed] = useState<boolean>(false);
  const allReviews = useAllReviews();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!title || !allReviews?.data || !currentUser?.name) {
        return null;
      }
      const existingReview = await allReviews?.data
        .filter((review: any) => review.title === title)
        .filter((review: any) => review.usersName === currentUser?.name);
      setReview("");
      if (existingReview.length > 0) {
        setReviewed(true);
      } else {
        setReviewed(false);
      }
    };
    fetchReviews();
  }, [allReviews?.data, currentUser?.name, title]);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setReview(value);
  };

  const getColor = (index: number) => {
    if (hoverRating >= index) {
      return "yellow";
    } else if (!hoverRating && rating >= index) {
      return "yellow";
    }
    return "white";
  };

  const starRating = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <button className="accessibilityScore" key={idx}>
          <BsFillStarFill
            size={20}
            style={{ color: getColor(idx) }}
            className="cursor-pointer mx-1"
            onMouseEnter={() => setHoverRating(idx)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onRating(idx)}
          />
        </button>
      ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, hoverRating]);

  return (
    <main className="w-full h-[30vh] p-4 ">
      {reviewed ? (
        <div className="flex flex-col items-center justify-around w-full h-4/5 lg:h-[80%] text-center md:text-xl lg:text-xl text-black my-3 rounded-md border border-yellow-300">
          <Image
            src={feedback}
            alt="symbol to show movie has been reviewed"
            width={100}
            height={100}
          />
          <p className="text-white">
            You have already reviewed this movie. Movie Social Club members
            thank you
          </p>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="What did you think of the movie? (optional)"
            value={review}
            onChange={handleChange}
            className="w-full h-3/5 lg:h-[90%] text-center md:text-xl lg:text-xl text-black my-3 rounded-md"
          />

          <div className="flex justify-center">
            <SubmitReviewButton
              userId={currentUser?.id}
              rating={rating}
              review={review}
              title={title}
              poster={poster}
              usersName={currentUser?.name}
            />
          </div>
        </>
      )}
    </main>
  );
};
export default Reviewform;
