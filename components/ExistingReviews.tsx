import { isEmpty } from "lodash";
import ExistingReviewCard from "./ExistingReviewCard";

interface Review {
  id: string;
  poster: string;
  rating: number;
  title: string;
  userId: string;
  review: string;
  usersName: string;
}

interface ExistingReviewProps {
  data: Review[];
}

const ExistingReviews: React.FC<ExistingReviewProps> = ({ data }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <main className=" w-full self-center">
      <h2 className=" text-white text-xl md:text-2xl lg:text-3xl font-bold lg:font-semibold mx-2 px-2 border-l-2 border-yellow-300">
        Movie Social Reviews
      </h2>
      <section className="flex flex-col md:grid grid-cols-3 md:w-5/6 lg:w-full md:self-center my-5 px-2 py-5 max-[767px]:gap-2 md:gap-y-10">
        {data.map((review) => (
          <ExistingReviewCard
            key={review?.id}
            rating={review?.rating}
            review={review?.review}
            name={review?.usersName}
          />
        ))}
      </section>
    </main>
  );
};
export default ExistingReviews;
