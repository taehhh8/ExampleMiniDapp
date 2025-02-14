import { NextRequest, NextResponse } from "next/server";
import { isValidToken } from "../../../../hooks/backend/survey";
import jwt from "jsonwebtoken";

interface InviteBody {
  idToken: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: InviteBody = await req.json();
    const profile = await isValidToken(body.idToken);
    const encodedUID = jwt.sign(
      profile.userId,
      process.env.INVITE_SECRET as string
    ); // won't be expired
    return NextResponse.json({ encodedUID }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 400 });
  }
}
