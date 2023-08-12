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
    <main className="w-full">
      <section className="flex flex-col justify-around md:w-5/6 lg:w-full my-5 border-white border-opacity-70 border rounded-md">
        {data.map((movie) => {
          return <ReviewListItem key={movie.id} data={movie} />;
        })}
      </section>
    </main>
  );
};
export default ReviewList;
