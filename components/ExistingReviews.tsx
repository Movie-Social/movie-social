interface Reviews {
  id: string;
  poster: string;
  rating: number;
  title: string;
  userId: string;
}

interface ExistingReviewProps {
  data: Reviews[];
}

const ExistingReviews: React.FC<ExistingReviewProps> = ({ data }) => {
  console.log(data, "recieved");
  return (
    <main>
      <h1>ReviewCard</h1>
    </main>
  );
};
export default ExistingReviews;
