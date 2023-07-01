import { isEmpty } from "lodash";
// import

interface ReviewListProps {
  data: Record<string, any>[];
}
const ReviewList: React.FC<ReviewListProps> = ({ data }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <main>
      <h2>Steve</h2>
      <div className="flex justify-around border-blue border-2 my-3"></div>
    </main>
  );
};
export default ReviewList;
