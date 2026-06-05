
import { NextResponse } from "next/server";
import data from "@/features/dashboard/data/dashboard.json";

export async function GET(): Promise<NextResponse> {
  await new Promise((r) => setTimeout(r, 400));
  return NextResponse.json(data.messages);
}