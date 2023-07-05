import useCurrentUser from "@/hooks/useCurrentUser";
import { useMemo, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillStarFill, BsStar } from "react-icons/bs";

interface ReviewProps {
  count: number;
  onRating: Function;
  rating: number;
}

const Reviewform: React.FC<ReviewProps> = ({ count, onRating, rating }) => {
  const currentUser = useCurrentUser();
  //   const [rating, setRating] = useState(0);
  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => {
        <BsFillStarFill key={idx} size={30} onClick={() => onRating(idx)} />;
      });
  }, [count, rating]);
  return (
    <main className="border-2 border-red-300 relative">
      <section className="flex flex-row justify-between">
        <div className="flex flex-row">
          <BiUserCircle size={30} />
          {currentUser.data.name}
        </div>
        <div className="flex flex-row">
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
