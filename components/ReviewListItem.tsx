interface ReviewListItemProps {
  data: Record<string, any>;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({ data }) => {
  console.log(data, "<<");
  return (
    <main>
      <h2>{data?.title}</h2>
    </main>
  );
};
export default ReviewListItem;
