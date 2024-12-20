import getFirebaseUid from "@/lib/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const uid = await getFirebaseUid(req);

  if (!uid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(uid, { status: 200 });
}
