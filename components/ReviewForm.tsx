import useCurrentUser from "@/hooks/useCurrentUser";
import { useMemo, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";

interface ReviewProps {
  onRating: Function;
  rating: number;
}

const Reviewform: React.FC<ReviewProps> = ({ onRating, rating }) => {
  const currentUser = useCurrentUser();
  const [hoverRating, setHoverRating] = useState(0);

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
          size={30}
          style={{ color: getColor(idx) }}
          className="cursor-pointer mx-1"
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRating(idx)}
        />
      ));
  }, [rating, hoverRating]);

  return (
    <main className="border-2 border-red-300 relative">
      <section className="flex flex-row justify-between">
        <div className="flex flex-row">
          <BiUserCircle size={30} />
          {currentUser.data.name}
        </div>
        <div className="flex flex-row">{starRating}</div>
      </section>
    </main>
  );
};
export default Reviewform;
