import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import { pool } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  try {
    const [rows] = await pool.query(
      `SELECT 
        t.id,
        t.title,
        t.description,
        t.category,
        t.payout,
        t.time_estimate as timeEstimate,
        t.deadline,
        ut.status,
        ut.participated_at as participatedAt,
        ut.completed_at as completedAt,
        ut.rating
      FROM user_tasks ut
      JOIN tasks t ON ut.task_id = t.id
      WHERE ut.user_id = ?
      ORDER BY ut.participated_at DESC`,
      [payload.id]
    );

    return NextResponse.json({ mytasks: rows });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 