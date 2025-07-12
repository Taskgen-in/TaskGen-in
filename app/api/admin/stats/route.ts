import { NextRequest, NextResponse } from 'next/server';
import { pool } from "@/lib/db";

export async function GET() {
  try {
    let totalUsers = 0;
    let activeUsers = 0;
    let totalTasks = 0;
    let activeTasks = 0;
    let totalPayouts = 0;
    let pendingPayouts = 0;
    let completionRate = 0;
    let avgTaskTime = 0;

    // Get total users
    try {
      const [totalUsersResult]: any = await pool.query(`
        SELECT COUNT(*) as total_users FROM task.users
      `);
      totalUsers = parseInt(totalUsersResult[0]?.total_users || '0');
      console.log('Total users query result:', totalUsersResult[0], 'Parsed:', totalUsers);
    } catch (error) {
      console.log('Users table not available, using default 0');
      totalUsers = 0;
    }

    // Get active users (users who have completed at least one task)
    try {
      const [activeUsersResult]: any = await pool.query(`
        SELECT COUNT(DISTINCT user_id) as active_users 
        FROM task.user_tasks 
        WHERE status = 'completed'
      `);
      activeUsers = parseInt(activeUsersResult[0]?.active_users || '0');
      console.log('Active users query result:', activeUsersResult[0], 'Parsed:', activeUsers);
    } catch (error) {
      console.log('User tasks table not available, using default 0');
      activeUsers = 0;
    }

    // Get total tasks
    try {
      const [totalTasksResult]: any = await pool.query(`
        SELECT COUNT(*) as total_tasks FROM task.tasks
      `);
      totalTasks = parseInt(totalTasksResult[0]?.total_tasks || '0');
      console.log('Total tasks query result:', totalTasksResult[0], 'Parsed:', totalTasks);
    } catch (error) {
      console.log('Tasks table not available, using default 0');
      totalTasks = 0;
    }

    // Get active tasks (not expired and not completed)
    try {
      const [activeTasksResult]: any = await pool.query(`
        SELECT COUNT(*) as active_tasks 
        FROM task.tasks 
        WHERE status = 'active' 
        AND deadline > NOW()
      `);
      activeTasks = parseInt(activeTasksResult[0]?.active_tasks || '0');
    } catch (error) {
      console.log('Active tasks query failed, using default 0');
      activeTasks = 0;
    }

    // Get total payouts (sum of all completed task payouts)
    try {
      const [totalPayoutsResult]: any = await pool.query(`
        SELECT COALESCE(SUM(t.payout), 0) as total_payouts
        FROM task.tasks t
        INNER JOIN task.user_tasks ut ON t.id = ut.task_id
        WHERE ut.status = 'completed'
      `);
      totalPayouts = parseInt(totalPayoutsResult[0]?.total_payouts || '0');
    } catch (error) {
      console.log('Total payouts query failed, using default 0');
      totalPayouts = 0;
    }

    // Get pending payouts (sum of pending withdrawal requests)
    try {
      const [pendingPayoutsResult]: any = await pool.query(`
        SELECT COALESCE(SUM(amount), 0) as pending_payouts
        FROM task.withdrawal_requests 
        WHERE status = 'pending'
      `);
      pendingPayouts = parseInt(pendingPayoutsResult[0]?.pending_payouts || '0');
    } catch (error) {
      console.log('Withdrawal requests table not available, using default 0');
      pendingPayouts = 0;
    }

    // Calculate completion rate
    try {
      const [completionStatsResult]: any = await pool.query(`
        SELECT 
          COUNT(*) as total_participations,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_participations
        FROM task.user_tasks
      `);
      const totalParticipations = parseInt(completionStatsResult[0]?.total_participations || '0');
      const completedParticipations = parseInt(completionStatsResult[0]?.completed_participations || '0');
      completionRate = totalParticipations > 0 ? Math.round((completedParticipations / totalParticipations) * 100) : 0;
    } catch (error) {
      console.log('Completion rate calculation failed, using default 0');
      completionRate = 0;
    }

    // Calculate average task completion time (in minutes)
    try {
      const [avgTimeResult]: any = await pool.query(`
        SELECT AVG(EXTRACT(EPOCH FROM (completed_at - participated_at)) / 60) as avg_time_minutes
        FROM task.user_tasks 
        WHERE status = 'completed' 
        AND completed_at IS NOT NULL 
        AND participated_at IS NOT NULL
      `);
      avgTaskTime = Math.round(parseFloat(avgTimeResult[0]?.avg_time_minutes || '0'));
    } catch (error) {
      console.log('Average time calculation failed, using default 0');
      avgTaskTime = 0;
    }

    const stats = {
      totalUsers,
      activeUsers,
      totalTasks,
      activeTasks,
      totalPayouts,
      pendingPayouts,
      completionRate,
      avgTaskTime
    };
    
    console.log('Admin stats calculated:', stats); // Debug log
    
    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
} 