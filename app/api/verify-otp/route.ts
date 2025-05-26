import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { signJWT } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, otp } = await req.json();
  // Validate OTP logic here...
  // Assume it's valid for demo

  // Find the user in DB
  const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
  if (!rows.length) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Invalidate OTP in DB here (set to NULL or delete it)

  // Set JWT cookie
  const token = signJWT({ id: rows[0].id, email: rows[0].email });
  const res = NextResponse.json({ success: true });
  res.cookies.set("session_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
