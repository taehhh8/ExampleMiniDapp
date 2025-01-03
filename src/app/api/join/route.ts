import { NextRequest } from "next/server";
import { joinGroup } from "../../../hooks/backend/survey";
import { ethers } from "ethers";

interface JoinGroupData {
  id: string;
  commitment: bigint;
  signature: ethers.SignatureLike;
  idToken: string;
  account: string;
}

export async function POST(req: NextRequest) {
  const data: JoinGroupData = await req.json();

  const receipt = await joinGroup(
    data.id,
    data.commitment,
    data.signature,
    data.idToken,
    data.account
  );

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(receipt),
  };
}
