
import { NextRequest, NextResponse } from "next/server";
import data from "@/features/campaigns/data/campaigns.json";

type MessagesData = typeof data.messages;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ creatorId: string }> }
): Promise<NextResponse> {
  await new Promise((r) => setTimeout(r, 400));
  const { creatorId } = await params;
  const messages = data.messages as MessagesData;
  const key = `creator-${creatorId}` as keyof MessagesData;
  const result = messages[key] ?? messages["creator-1"];
  return NextResponse.json(result);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ creatorId: string }> }
): Promise<NextResponse> {
  await new Promise((r) => setTimeout(r, 300));
  const { creatorId } = await params;
  const body = await req.json();
  const now = new Date();
  const newMessage = {
    id: Date.now(),
    role: "brand",
    text: body.text,
    time: now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    date: now.toLocaleDateString("id-ID", { month: "long", day: "numeric" }),
    creatorId,
  };
  return NextResponse.json(newMessage, { status: 201 });
}
