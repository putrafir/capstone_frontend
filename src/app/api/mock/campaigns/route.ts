
import { NextResponse } from "next/server";
import data from "@/data/campaigns.json";

export async function GET(): Promise<NextResponse> {
  await new Promise((r) => setTimeout(r, 500));
  return NextResponse.json(data.campaigns);
}
