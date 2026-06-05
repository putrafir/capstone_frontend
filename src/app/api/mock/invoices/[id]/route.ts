import { NextRequest, NextResponse } from "next/server";
import data from "@/features/payment/data/invoices.json";

function maybeError(): boolean {
  return Math.random() < 0.1;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  await new Promise((r) => setTimeout(r, 500));
  if (maybeError()) {
    return NextResponse.json(
      { message: "Gagal mengambil invoice" },
      { status: 500 }
    );
  }
  const { id } = await params;
  const invoice = data.invoices.find((inv) => inv.id === id);
  if (!invoice) {
    return NextResponse.json({ message: "Invoice tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(invoice);
}
