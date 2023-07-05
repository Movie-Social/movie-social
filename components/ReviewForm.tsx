import useCurrentUser from "@/hooks/useCurrentUser";
import { useMemo, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillStarFill, BsStar } from "react-icons/bs";

interface ReviewProps {
  count: number;
  onRating: Function;
  rating: number;
  color: string;
}

const Reviewform: React.FC<ReviewProps> = ({
  count,
  onRating,
  color,
  rating,
}) => {
  const currentUser = useCurrentUser();
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }
    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => {
        <BsFillStarFill
          key={idx}
          size={30}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRating(idx)}
        />;
      });
  }, [count, rating, hoverRating]);

  return (
    <main className="border-2 border-red-300 relative">
      <section className="flex flex-row justify-between">
        <div className="flex flex-row">
          <BiUserCircle size={30} />
          {currentUser.data.name}
        </div>
        <div className="flex flex-row">
          {starRating}
          {/* <BsFillStarFill className="cursor-pointer" size={30} />
          <BsFillStarFill size={30} />
          <BsFillStarFill size={30} />
          <BsFillStarFill size={30} /> */}
        </div>
      </section>
      <div className="stars"></div>
    </main>
  );
};
export default Reviewform;
