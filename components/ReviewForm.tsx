import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useMemo, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import SubmitReviewButton from "./SubmitReviewButton";
import feedback from "../public/images/feedback.png";

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
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
        <BsFillStarFill
          key={idx}
          size={20}
          style={{ color: getColor(idx) }}
          className="cursor-pointer mx-1"
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRating(idx)}
        />
      ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, hoverRating]);
  return (
    <main className="w-full h-[30vh] p-4 ">
      {!submitted ? (
        <section className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-center items-center">
            <BiUserCircle size={30} />
            <p className="text-white ">{currentUser?.name}</p>
          </div>
          <div className="flex flex-row">{starRating}</div>
        </section>
      ) : null}
      {!submitted ? (
        <input
          type="text"
          placeholder="What did you think of the movie? (optional)"
          value={review}
          onChange={handleChange}
          className="w-full h-3/5 lg:h-[90%] text-center md:text-xl lg:text-xl text-black my-3 rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center justify-around w-full h-4/5 lg:h-[80%] text-center md:text-xl lg:text-xl text-black my-3 rounded-md border border-white">
          <Image
            src={feedback}
            alt="symbol to show movie has been reviewed"
            width={100}
            height={100}
          />
          <p className="text-white">Thank you for your review,</p>
          <p className="text-white">{currentUser?.name}!</p>
        </div>
      )}
      {!submitted ? (
        <div className="flex justify-center" onClick={() => setSubmitted(true)}>
          <SubmitReviewButton
            userId={currentUser?.id}
            rating={rating}
            review={review}
            title={title}
            poster={poster}
            usersName={currentUser?.name}
          />
        </div>
      ) : null}
    </main>
  );
};
export default Reviewform;
