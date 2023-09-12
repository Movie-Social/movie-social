import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import ExistingReviewCard from "./ExistingReviewCard";

interface UpdateReviewButtonProps {
  oldReview: string;
  updatedReview: string;
  name: string;
  rating: number;
}

const UpdateReviewButton: React.FC<UpdateReviewButtonProps> = ({
  oldReview,
  updatedReview,
  name,
  rating,
}) => {
  const [updated, setUpdated] = useState<boolean>(false);

  return !updated ? (
    <main
      onClick={() => {
        // console.log();
        axios.post("/api/updateReview", { oldReview, updatedReview });
        setUpdated(true);
      }}
      className="w-full flex justify-center cursor-pointer"
    >
      <button className=" w-2/5 border border-yellow-300 rounded-md p-1">
        Update
      </button>
    </main>
  ) : (
    <ExistingReviewCard review={updatedReview} rating={rating} name={name} />
  );
};
export default UpdateReviewButton;
