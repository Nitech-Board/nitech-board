import React from "react";
import styles from "./ReviewList.module.css";
import { ReviewDataWithStudent } from "@/types/course";
import { Avatar, Rating } from "@mui/material";

interface ReviewListProps {
  reviews: ReviewDataWithStudent[];
}

const Review = ({ review }: { review: ReviewDataWithStudent }) => {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewProfile}>
        <Avatar>{review.studentEnrollmentYear % 100}</Avatar>
        <p>{review.studentName}</p>
      </div>
      <div className={styles.reviewContent}>
        <div>
          <div className={styles.ratingSection}>
            <strong className={styles.description}>授業のわかりやすさ</strong>
            <Rating value={review.clearityRating} precision={0.1} readOnly />
          </div>
          <div className={styles.ratingSection}>
            <strong className={styles.description}>テストの簡単さ</strong>
            <Rating value={review.testRating} precision={0.1} readOnly />
          </div>
          <div className={styles.ratingSection}>
            <strong className={styles.description}>課題の楽さ</strong>
            <Rating value={review.homeworkRating} precision={0.1} readOnly />
          </div>
          {review.comment && (
            <div className={styles.commentSection}>
              <p>
                <strong>コメント :</strong>{" "}
              </p>
              <p>{review.comment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className={styles.reviewList}>
      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
