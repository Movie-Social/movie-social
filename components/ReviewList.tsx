import { isEmpty } from "lodash";
import ReviewListItem from "./ReviewListItem";

interface ReviewListProps {
  data: Record<string, any>[];
}
const ReviewList: React.FC<ReviewListProps> = ({ data }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <main className="w-full flex justify-center">
      <section className="flex flex-col justify-around md:w-5/6 my-3 md:border-yellow-300 md:border-2 md:rounded-md">
        {data.map((movie) => {
          return <ReviewListItem key={movie.id} data={movie} />;
        })}
      </section>
    </main>
  );
};
export default ReviewList;
