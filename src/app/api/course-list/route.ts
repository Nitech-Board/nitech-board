import getFirebaseUid from "@/lib/authMiddleware";
import { getCourseList } from "@/repositories/course";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const uid = await getFirebaseUid(req);
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const courseList = await getCourseList();
  return NextResponse.json(courseList, { status: 200 });
}
