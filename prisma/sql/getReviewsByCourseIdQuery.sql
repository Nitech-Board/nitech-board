SELECT
  review.id,
  review.clearity_rating,
  review.test_rating,
  review.homework_rating,
  review.comment,
  student.id AS student_id,
  student.name AS student_name,
  student.enrollment_year AS student_enrollment_year
FROM
  review
  JOIN student ON review.student_id = student.id
WHERE
  course_id = $1;
