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
    // Fetch user's recent activity from completed tasks
    const [activityRows] = await pool.query(
      `SELECT 
        t.title as task_name,
        t.payout as amount,
        ut.completed_at as date,
        ut.rating,
        ut.status,
        t.category
      FROM user_tasks ut
      JOIN tasks t ON ut.task_id = t.id
      WHERE ut.user_id = ? AND ut.status = 'completed'
      ORDER BY ut.completed_at DESC
      LIMIT 10`,
      [payload.id]
    );

    const activities = (activityRows as any[]).map(row => ({
      task: row.task_name,
      amount: row.amount,
      date: new Date(row.date).toISOString().split('T')[0],
      status: row.status,
      rating: row.rating || 5,
      category: row.category
    }));

    return NextResponse.json({ activities });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 