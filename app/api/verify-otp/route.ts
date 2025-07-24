import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { signJWT } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    // 1. Fetch user
    const [rows]: any = await pool.query("SELECT * FROM users WHERE email=?", [email]);
    if (!rows.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    // 2. Validate OTP
    if (!user.otp_code || user.otp_code !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    // 3. Check expiry
    if (!user.otp_expires || new Date(user.otp_expires) < new Date()) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 401 });
    }

    // 4. Invalidate OTP and mark email verified
    await pool.query(
      `UPDATE users SET otp_code = NULL, otp_expires = NULL, is_verified = 1 WHERE email = ?`,
      [email]
    );

    // 5. Generate JWT
    const token = signJWT({ id: user.id, email: user.email, role: user.role });

    // 6. Set token in cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
