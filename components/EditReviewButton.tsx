import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAllReviews from "@/hooks/useAllReviews";
import { AiOutlineEdit } from "react-icons/ai";

interface EditReviewButtonProps {
  review: string;
  usersName: string;
}

const EditReviewButton: React.FC<EditReviewButtonProps> = ({ review }) => {
  return (
    <>
      <AiOutlineEdit className="text-yellow-300 self-center" size={20} />
    </>
  );
};
export default EditReviewButton;
