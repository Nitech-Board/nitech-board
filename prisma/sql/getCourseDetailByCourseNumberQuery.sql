SELECT
  course.id,
  course.title,
  course.good_summary,
  course.bad_summary,
  teacher.first_name,
  teacher.last_name,
  course_number.number
FROM
  course
  JOIN course_number ON course.id = course_number.course_id
  JOIN teacher ON course.teacher_id = teacher.id
WHERE
  course_number.number = $1
LIMIT 1;
