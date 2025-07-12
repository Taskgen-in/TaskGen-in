import { NextRequest, NextResponse } from 'next/server';
import { pool } from "@/lib/db";

export async function GET() {
  try {
    // Fetch withdrawal requests and join with user info
    const [rows]: any = await pool.query(`
      SELECT 
        w.id,
        u.name as userName,
        w.amount,
        w.upi_id,
        w.bank_account,
        w.bank_ifsc,
        w.requested_at as requestDate,
        w.status
      FROM task.withdrawals w
      LEFT JOIN task.users u ON w.user_id = u.id
      ORDER BY w.requested_at DESC
    `);

    const withdrawals = rows.map((w: any) => ({
      id: w.id,
      userName: w.userName || 'Unknown',
      amount: w.amount,
      upiId: w.upi_id,
      bankAccount: w.bank_account,
      bankIfsc: w.bank_ifsc,
      requestDate: w.requestDate ? new Date(w.requestDate).toISOString().split('T')[0] : '',
      status: w.status
    }));

    return NextResponse.json(withdrawals);
  } catch (error) {
    console.error('Error fetching withdrawals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch withdrawal requests' },
      { status: 500 }
    );
  }
} 