import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email, userId } = await req.json();
    
    if (!email || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId,
    });

    return NextResponse.json({ message: "Verification email sent!" }, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
