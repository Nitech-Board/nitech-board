import getFirebaseUid from "@/lib/authMiddleware";
import { createProfile, getProfile } from "@/repositories/profile";
import { NextRequest, NextResponse } from "next/server";

// プロフィールが存在したら，そのプロフィールを返す
export async function GET(req: NextRequest): Promise<NextResponse> {
  const uid = await getFirebaseUid(req);

  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const profile = await getProfile(uid);

  return NextResponse.json(profile, { status: 200 });
}

// プロフィールを作成し，作成したプロフィールを返す
export async function POST(req: NextRequest): Promise<NextResponse> {
  const uid = await getFirebaseUid(req);

  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, enrollmentYear } = await req.json();

  try {
    const profile = await createProfile({
      name,
      firebaseUid: uid,
      enrollmentYear,
    });
    return NextResponse.json(profile, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: e.message || "Failed to create profile" },
      { status: 500 }
    );
  }
}
