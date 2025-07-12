import { NextRequest, NextResponse } from "next/server";
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
    // Get all tasks
    const [tasks] = await pool.query(
      `SELECT t.* FROM tasks t ORDER BY t.created_at DESC`
    );

    // Get all task_ids the user has participated in
    const [participated] = await pool.query(
      `SELECT task_id FROM task_participants WHERE user_id = ?`,
      [payload.id]
    );
    const participatedIds = new Set((participated as any[]).map((row: any) => row.task_id));

    // Mark each task as participated or not
    const result = (tasks as any[]).map((task: any) => ({
      ...task,
      isParticipated: participatedIds.has(task.id)
    }));

    return NextResponse.json({ tasks: result });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { taskId } = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  // Check if already joined
  const [existing] = await pool.query(
    "SELECT id FROM task_participants WHERE user_id = ? AND task_id = ?",
    [payload.id, taskId]
  );
  if ((existing as any[]).length > 0) {
    return NextResponse.json({ error: "Already joined" }, { status: 409 });
  }

  // Insert participation
  await pool.query(
    "INSERT INTO task_participants (user_id, task_id, joined_at) VALUES (?, ?, NOW())",
    [payload.id, taskId]
  );
  return NextResponse.json({ success: true });
} 