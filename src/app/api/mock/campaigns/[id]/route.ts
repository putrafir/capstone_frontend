import { NextRequest, NextResponse } from "next/server";
import data from "@/data/campaigns.json";

type Campaign = (typeof data.campaigns)[number];
type CampaignDetail =
  (typeof data.campaignDetails)[keyof typeof data.campaignDetails];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  await new Promise((r) => setTimeout(r, 600));

  const { id } = await params;

  const campaign = data.campaigns.find(
    (c: Campaign) => c.id === id
  );

  if (!campaign) {
    return NextResponse.json(
      {
        message: "Campaign tidak ditemukan",
      },
      {
        status: 404,
      }
    );
  }

  
  const detail =
    data.campaignDetails[
      id as keyof typeof data.campaignDetails
    ];

  
  if (detail) {
    return NextResponse.json(detail);
  }

  
  const template =
    data.campaignDetails[
      "camp-001" as keyof typeof data.campaignDetails
    ] as CampaignDetail;

  return NextResponse.json({
    ...template,

    id: campaign.id,
    title: `${campaign.title} Campaign`,
    startDate: campaign.startDate,

    tracking: {
      ...template.tracking,
    },

    creators: template.creators.map((creator) => ({
      ...creator,
      id: creator.id + Number(campaign.id.replace("camp-", "")) * 100,
    })),
  });
}