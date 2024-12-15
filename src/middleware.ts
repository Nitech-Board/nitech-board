import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest): NextResponse {
  // firebase token をheader から取得
  const token = req.headers.get("Authorization");

  // verify
  if (token !== "Bearer " + process.env.FIREBASE_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log("Middleware");
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
