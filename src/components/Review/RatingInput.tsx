import React from "react";
import { Rating } from "@mui/material";

interface RatingInputProps {
  rating: number;
  onChange: (value: number | null) => void;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  rating,
  onChange,
}) => {
  return (
    <div>
      <Rating
        value={rating}
        onChange={(_, newValue) => onChange(newValue)}
        precision={0.5}
        size="large"
      />
    </div>
  );
};
