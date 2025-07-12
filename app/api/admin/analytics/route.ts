import { NextResponse } from 'next/server';
import { pool } from "@/lib/db";

export async function GET() {
  try {
    // New Registrations Today
    const [registrationsRows]: any = await pool.query(`
      SELECT COUNT(*) as newRegistrations
      FROM task.users
      WHERE DATE(created_at) = CURDATE()
    `);

    // New Tasks Today
    const [tasksRows]: any = await pool.query(`
      SELECT COUNT(*) as newTasksToday
      FROM task.tasks
      WHERE DATE(created_at) = CURDATE()
    `);

    // New Withdrawals Today
    const [withdrawalsRows]: any = await pool.query(`
      SELECT COUNT(*) as newWithdrawalsToday
      FROM task.withdrawals
      WHERE DATE(requested_at) = CURDATE()
    `);

    // Total Users
    const [totalUsersRows]: any = await pool.query(`
      SELECT COUNT(*) as totalUsers
      FROM task.users
    `);

    // Total Tasks
    const [totalTasksRows]: any = await pool.query(`
      SELECT COUNT(*) as totalTasks
      FROM task.tasks
    `);

    // Total Withdrawals
    const [totalWithdrawalsRows]: any = await pool.query(`
      SELECT COUNT(*) as totalWithdrawals
      FROM task.withdrawals
    `);

    return NextResponse.json({
      newRegistrations: registrationsRows[0]?.newRegistrations || 0,
      newTasksToday: tasksRows[0]?.newTasksToday || 0,
      newWithdrawalsToday: withdrawalsRows[0]?.newWithdrawalsToday || 0,
      totalUsers: totalUsersRows[0]?.totalUsers || 0,
      totalTasks: totalTasksRows[0]?.totalTasks || 0,
      totalWithdrawals: totalWithdrawalsRows[0]?.totalWithdrawals || 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
} 