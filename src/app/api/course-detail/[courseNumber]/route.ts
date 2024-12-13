import { getCourseDetailByCourseNumber } from "@/repositories/course";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseNumber: string }>;
  }
): Promise<NextResponse> {
  const courseNumber = (await params).courseNumber;
  const courseDetail = await getCourseDetailByCourseNumber(courseNumber);

  if (!courseDetail) {
    return NextResponse.json(
      { message: "授業情報が見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(courseDetail, { status: 200 });
}
