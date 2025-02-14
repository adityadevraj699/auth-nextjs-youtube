// app/api/auth/session/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // The server can access httpOnly cookies using NextRequest
  const token = request.cookies.get("token")?.value;

  if (token) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false });
  }
}
