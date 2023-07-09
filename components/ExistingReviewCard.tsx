interface ExistingReviewCardProps {
  review: string;
  rating: number;
}
const ExistingReviewCard: React.FC<ExistingReviewCardProps> = ({
  rating,
  review,
}) => {
  console.log(rating, "rationg");
  console.log(review, "review");
  return (
    <>
      <h1>hey</h1>
    </>
  );
};
export default ExistingReviewCard;
