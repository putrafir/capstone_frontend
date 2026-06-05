import { NextResponse } from "next/server";
import data from "@/data/payments.json";

function maybeError(): boolean {
  return Math.random() < 0.1;
}

export async function GET(): Promise<NextResponse> {
  await new Promise((r) => setTimeout(r, 600));
  if (maybeError()) {
    return NextResponse.json(
      { message: "Gagal mengambil data pembayaran" },
      { status: 500 }
    );
  }
  return NextResponse.json(data.campaigns);
}
