import { NextResponse } from "next/server";
import data from "@/features/payment/data/paymentMethods.json";

export async function GET(): Promise<NextResponse> {
  await new Promise((r) => setTimeout(r, 300));
  return NextResponse.json(data.methods);
}
