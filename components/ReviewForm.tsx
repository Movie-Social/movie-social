import useCurrentUser from "@/hooks/useCurrentUser";
import { useMemo, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import SubmitReviewButton from "./SubmitReviewButton";

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
    <main className="w-full h-[30vh] p-4 border-2 border-orange-500">
      <section className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center">
          <BiUserCircle size={30} />
          <p className="text-white ">{currentUser?.name}</p>
        </div>
        <div className="flex flex-row">{starRating}</div>
      </section>
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
    </main>
  );
};
export default Reviewform;
