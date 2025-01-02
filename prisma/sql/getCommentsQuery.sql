SELECT
  review.comment
FROM
  course
  JOIN review ON course.id = review.course_id
WHERE
  review.comment IS NOT NULL
  AND review.comment != ''
  AND course.id = $1
ORDER BY
  review.updated_at DESC
