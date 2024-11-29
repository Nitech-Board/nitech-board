import { getClassList } from "@/repositories/class";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const classList = getClassList();
  return NextResponse.json(classList, { status: 200 });
}
