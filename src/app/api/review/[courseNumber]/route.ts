import getFirebaseUid from "@/lib/authMiddleware";
import { getProfile } from "@/repositories/profile";
import { insertReview } from "@/repositories/review";
import { ReviewData } from "@/types/course";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseNumber: string }>;
  }
): Promise<NextResponse> {
  const courseNumber = (await params).courseNumber;
  const uid = await getFirebaseUid(req);

  if (!uid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const studentProfile = await getProfile(uid);
  if (!studentProfile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
  const studentId = studentProfile.id;

  const data = await req.json();

  const review = reviewDataValidator(data.reviewData);
  const courseDetail = await insertReview(courseNumber, studentId, review);

  if (!courseDetail) {
    return NextResponse.json(
      { message: "授業情報が見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(courseDetail, { status: 200 });
}

const reviewDataValidator = (review: any): ReviewData => {
  if (
    review.clearityRating === undefined ||
    typeof review.clearityRating !== "number"
  ) {
    throw new Error("clearityRating is required and must be a number");
  }
  if (
    review.testRating === undefined ||
    typeof review.testRating !== "number"
  ) {
    throw new Error("testRating is required and must be a number");
  }
  if (
    review.homeworkRating === undefined ||
    typeof review.homeworkRating !== "number"
  ) {
    throw new Error("homeworkRating is required and must be a number");
  }
  if (review.comment === undefined || typeof review.comment !== "string") {
    throw new Error("comment is required and must be a string");
  }
  return review;
};
