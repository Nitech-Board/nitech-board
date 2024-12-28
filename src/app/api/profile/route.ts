import getFirebaseUid from "@/lib/authMiddleware";
import { createOrUpdateProfile, getProfile } from "@/repositories/profile";
import { NextRequest, NextResponse } from "next/server";

// プロフィールが存在したら，そのプロフィールを返す
export async function GET(req: NextRequest): Promise<NextResponse> {
  const uid = await getFirebaseUid(req);

  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const profile = await getProfile(uid);

  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile, { status: 200 });
}

// プロフィールを作成し，作成したプロフィールを返す
// 既にプロフィールが存在する場合,更新する
export async function POST(req: NextRequest): Promise<NextResponse> {
  const uid = await getFirebaseUid(req);

  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { nickname: name, enrollmentYear: enrollmentYearString } =
    await req.json();
  const enrollmentYear = parseInt(enrollmentYearString);

  try {
    const profile = await createOrUpdateProfile({
      name,
      firebaseUid: uid,
      enrollmentYear,
    });
    return NextResponse.json(profile, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: e.message || "Failed to create profile" },
      { status: 500 }
    );
  }
}
