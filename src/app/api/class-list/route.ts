import { classSummary } from "@/app/types/class";
import { NextResponse } from "next/server";

const classList: classSummary[] = [
  { classNumber: "7262", name: "パターン認識" },
  { classNumber: "8151", name: "人工知能" },
  { classNumber: "9123", name: "コンピュータビジョン" },
];

export function GET(): NextResponse {
  return NextResponse.json(classList, { status: 200 });
}
