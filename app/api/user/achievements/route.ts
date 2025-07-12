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
    // Get user statistics for achievement calculation
    const [statsRows] = await pool.query(
      `SELECT 
        COUNT(*) as total_tasks,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
        SUM(CASE WHEN status = 'completed' THEN payout ELSE 0 END) as total_earned,
        AVG(CASE WHEN status = 'completed' THEN rating ELSE NULL END) as avg_rating,
        COUNT(CASE WHEN completed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as tasks_this_week,
        COUNT(CASE WHEN completed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as tasks_this_month
      FROM user_tasks 
      WHERE user_id = ?`,
      [payload.id]
    );

    const stats = (statsRows as any[])[0] || {
      total_tasks: 0,
      completed_tasks: 0,
      total_earned: 0,
      avg_rating: 0,
      tasks_this_week: 0,
      tasks_this_month: 0
    };

    // Define achievements based on user statistics
    const achievements = [
      {
        id: "first_task",
        title: "First Task Completed",
        icon: "🎯",
        description: "Complete your first task",
        earned: stats.completed_tasks >= 1,
        progress: Math.min(stats.completed_tasks, 1),
        required: 1
      },
      {
        id: "ten_tasks",
        title: "10 Tasks Milestone",
        icon: "🏆",
        description: "Complete 10 tasks",
        earned: stats.completed_tasks >= 10,
        progress: Math.min(stats.completed_tasks, 10),
        required: 10
      },
      {
        id: "perfect_week",
        title: "Perfect Week",
        icon: "⭐",
        description: "Complete 7 tasks in a week",
        earned: stats.tasks_this_week >= 7,
        progress: Math.min(stats.tasks_this_week, 7),
        required: 7
      },
      {
        id: "speed_demon",
        title: "Speed Demon",
        icon: "⚡",
        description: "Complete 5 tasks in a day",
        earned: false, // Would need daily tracking
        progress: 0,
        required: 5
      },
      {
        id: "quality_expert",
        title: "Quality Expert",
        icon: "💎",
        description: "Maintain 4.5+ rating",
        earned: stats.avg_rating >= 4.5,
        progress: Math.min(stats.avg_rating, 5),
        required: 4.5
      },
      {
        id: "consistent_performer",
        title: "Consistent Performer",
        icon: "🔥",
        description: "Complete 20 tasks in a month",
        earned: stats.tasks_this_month >= 20,
        progress: Math.min(stats.tasks_this_month, 20),
        required: 20
      },
      {
        id: "earner",
        title: "Top Earner",
        icon: "💰",
        description: "Earn ₹1000 in a month",
        earned: stats.total_earned >= 1000,
        progress: Math.min(stats.total_earned, 1000),
        required: 1000
      },
      {
        id: "veteran",
        title: "Task Veteran",
        icon: "👑",
        description: "Complete 50 tasks",
        earned: stats.completed_tasks >= 50,
        progress: Math.min(stats.completed_tasks, 50),
        required: 50
      }
    ];

    return NextResponse.json({ 
      achievements,
      stats: {
        totalTasks: stats.total_tasks,
        completedTasks: stats.completed_tasks,
        totalEarned: stats.total_earned,
        avgRating: stats.avg_rating,
        tasksThisWeek: stats.tasks_this_week,
        tasksThisMonth: stats.tasks_this_month
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 