import axios from "axios";
import React, { useCallback, useMemo } from "react";

interface UpdateReviewButtonProps {
  oldReview: string;
  updatedReview: string;
  name: string;
}

const UpdateReviewButton: React.FC<UpdateReviewButtonProps> = ({
  oldReview,
  updatedReview,
  //   name,
}) => {
  return (
    <main
      onClick={() => {
        // console.log();
        axios.post("/api/updateReview", { oldReview, updatedReview });
      }}
      className="w-full flex justify-center cursor-pointer"
    >
      <button className=" w-2/5 border border-yellow-300 rounded-md p-1">
        Update
      </button>
    </main>
  );
};
export default UpdateReviewButton;
