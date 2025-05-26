import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"

// Helper function for safe JSON parsing
function safeJSONParse(str: any, fallback: any) {
  try {
    if (!str || typeof str !== "string" || str.trim() === "") return fallback;
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query(
      `SELECT 
        id, title, description, category, difficulty, payout, 
        max_participants as maxParticipants, time_limit as timeLimit, deadline, 
        requirements, instructions, tags, estimated_time as estimatedTime, 
        quality_standards as qualityStandards, media, status, created_at as createdDate
      FROM tasks
      ORDER BY created_at DESC`
    );

    const tasks = rows.map((task: any) => ({
      ...task,
      requirements: safeJSONParse(task.requirements, []),
      instructions: safeJSONParse(task.instructions, []),
      tags: safeJSONParse(task.tags, []),
      media: safeJSONParse(task.media, {}),
    }));

    return NextResponse.json(tasks);
  } catch (error: any) {
    console.error("API ERROR in /api/admin/tasks:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST handler (your existing code) here...
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      category,
      difficulty,
      payout,
      maxParticipants,
      timeLimit,
      deadline,
      requirements,
      instructions,
      tags,
      estimatedTime,
      qualityStandards,
      media
    } = body;

    if (
      !title || !description || !category || !difficulty ||
      !payout || !maxParticipants || !timeLimit || !deadline
    ) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO tasks (
        title, description, category, difficulty, payout, max_participants, time_limit, deadline,
        requirements, instructions, tags, estimated_time, quality_standards, media, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        title,
        description,
        category,
        difficulty,
        payout,
        maxParticipants,
        timeLimit,
        deadline,
        JSON.stringify(requirements.filter((r: string) => r.trim())),
        JSON.stringify(instructions.filter((i: string) => i.trim())),
        JSON.stringify(tags),
        estimatedTime || null,
        qualityStandards || null,
        JSON.stringify(media || {}),
        "active"
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
