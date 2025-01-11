SELECT
  title as course_title,
  course_number.number as course_number,
  first_name as teacher_first_name,
  last_name as teacher_last_name,
  (
    SELECT
      COUNT(*)
    FROM
      review
    WHERE
      review.course_id = course.id
  ) as review_count
FROM
  course
  JOIN course_number ON course.id = course_number.course_id
  JOIN teacher ON course.teacher_id = teacher.id
