import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response; // ✅ Ensure response is returned

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: error.response?.status || 500 }
        );
    }
}
