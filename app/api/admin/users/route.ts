import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

function isKYCVerified(user: any) {
  const upiPresent = !!user.upi_id && user.upi_id.trim() !== "";
  const bankDetailsPresent =
    !!user.bank_name && user.bank_name.trim() !== "" &&
    !!user.bank_account && user.bank_account.trim() !== "" &&
    !!user.ifsc_code && user.ifsc_code.trim() !== "";

  return (
    user.kyc_verified == 1 &&
    user.is_verified == 1 &&
    user.mobile_verified == 1 &&
    user.payment_setup == 1 &&
    (upiPresent || bankDetailsPresent)
  );
}

export async function GET() {
  try {
    const [rows]: any = await pool.query(`
      SELECT id, name, email, phone, role, upi_id, bank_name, bank_account, ifsc_code, 
             kyc_verified, is_verified, mobile_verified, payment_setup, status, created_at
      FROM task.users
      WHERE role = 'user'
    `);

    const users = rows.map((user: any) => ({
      ...user,
      kyc_status: isKYCVerified(user) ? "verified" : "pending"
    }));

    return NextResponse.json(users);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
