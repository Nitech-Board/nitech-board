import React from "react";
import styles from "./ReviewList.module.css";
import { ReviewDataWithStudent } from "@/types/course";
import { Rating } from "@mui/material";

interface ReviewListProps {
  reviews: ReviewDataWithStudent[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className={styles.reviewList}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.reviewItem}>
          <div className={styles.ratingSection}>
            <strong>授業のわかりやすさ:</strong>
            <Rating value={review.clearityRating} precision={0.1} readOnly />
          </div>
          <div className={styles.ratingSection}>
            <strong>テストの簡単さ:</strong>
            <Rating value={review.testRating} precision={0.1} readOnly />
          </div>
          <div className={styles.ratingSection}>
            <strong>課題の楽さ:</strong>
            <Rating value={review.homeworkRating} precision={0.1} readOnly />
          </div>
          {review.comment && (
            <div className={styles.commentSection}>
              <strong>コメント:</strong> {review.comment}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
