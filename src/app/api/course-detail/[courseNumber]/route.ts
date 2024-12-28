import getFirebaseUid from "@/lib/authMiddleware";
import { getCourseDetailByCourseNumber } from "@/repositories/course";
import { getReviewsByCourseId } from "@/repositories/review";
import { CourseDetailWithReviews } from "@/types/course";
import { NextRequest, NextResponse } from "next/server";

// GET /api/course-detail/[courseNumber]
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseNumber: string }>;
  }
): Promise<NextResponse> {
  const uid = await getFirebaseUid(req);
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  console.log(uid);

  const courseNumber = (await params).courseNumber;
  const courseDetail = await getCourseDetailByCourseNumber(courseNumber);

  if (!courseDetail) {
    return NextResponse.json(
      { message: "授業情報が見つかりません" },
      { status: 404 }
    );
  }

  const reviews = await getReviewsByCourseId(courseDetail.courseId);

  const response: CourseDetailWithReviews = {
    course: courseDetail,
    reviews: reviews,
  };

  return NextResponse.json(response, { status: 200 });
}
