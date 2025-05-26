import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const { utr, paymentMethod, amount } = await req.json();
  if (!utr || !paymentMethod) {
    return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
  }

  // Save to premium_payments table (admin can verify later)
  await pool.query(
    `INSERT INTO premium_payments (user_id, utr, payment_method, amount, status, created_at)
     VALUES (?, ?, ?, ?, 'pending', NOW())`,
    [payload.id, utr, paymentMethod, amount]
  );

  // Optionally, you can auto-update user's premium status if you want instant upgrade (not recommended for manual review)
  // await pool.query("UPDATE users SET is_premium=1, premium_activated_at=NOW() WHERE id=?", [payload.id]);

  return NextResponse.json({ success: true });
}
