import { isEmpty } from "lodash";
import ExistingReviewCard from "./ExistingReviewCard";
interface Review {
  id: string;
  poster: string;
  rating: number;
  title: string;
  userId: string;
  review: string;
}

interface ExistingReviewProps {
  data: Review[];
}

const ExistingReviews: React.FC<ExistingReviewProps> = ({ data }) => {
  if (isEmpty(data)) {
    return null;
  }
  console.log(data, "Neg");
  return (
    <main className="w-[90%] ml-[5%] border-2 self-center mt-5">
      <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-white text-1xl lg:text-2xl font-bold">
        Movie Social Reviews
      </h2>
      <section className="flex justify-center">
        {data.map((review) => (
          <ExistingReviewCard
            key={review?.id}
            rating={review?.rating}
            review={review?.review}
          />
        ))}
      </section>
    </main>
  );
};
export default ExistingReviews;
