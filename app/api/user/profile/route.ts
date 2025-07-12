import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import { pool } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies(); // No await needed
  const token = cookieStore.get("session_token")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  // Alias ALL columns for clarity!
  const [rows] = await pool.query(
    `SELECT 
      is_verified AS emailVerified, 
      mobile_verified AS mobileVerified, 
      kyc_verified AS kycCompleted, 
      payment_setup AS paymentSetup 
    FROM users WHERE id = ?`,
    [payload.id]
  );
  if (!(rows as any).length) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const user = (rows as any)[0];
  return NextResponse.json({
    emailVerified: !!user.emailVerified,
    mobileVerified: !!user.mobileVerified,
    kycCompleted: !!user.kycCompleted,
    paymentSetup: !!user.paymentSetup
  });
}
