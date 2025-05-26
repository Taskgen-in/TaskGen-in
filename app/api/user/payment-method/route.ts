import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  // Use await if cookies() is async in your Next.js version
  const cookieStore = cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyJWT(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const { paymentMethod, upiId, bankAccount } = await req.json();

  try {
    if (paymentMethod === "upi" && upiId) {
      await pool.query(
        "UPDATE users SET upi_id = ?, bank_account = NULL, ifsc_code = NULL, bank_name = NULL, account_holder_name = NULL, payment_setup = 1 WHERE id = ?",
        [upiId, payload.id]
      );
    } else if (
      paymentMethod === "bank" &&
      bankAccount &&
      bankAccount.accountHolderName &&
      bankAccount.bankAccountNumber &&
      bankAccount.ifscCode &&
      bankAccount.bankName
    ) {
      await pool.query(
        "UPDATE users SET upi_id = NULL, bank_account = ?, ifsc_code = ?, bank_name = ?, account_holder_name = ?, payment_setup = 1 WHERE id = ?",
        [
          bankAccount.bankAccountNumber,
          bankAccount.ifscCode,
          bankAccount.bankName,
          bankAccount.accountHolderName,
          payload.id,
        ]
      );
    } else {
      // Incomplete data, mark as not set up
      await pool.query("UPDATE users SET payment_setup = 0 WHERE id = ?", [payload.id]);
      return NextResponse.json({ success: false, error: "Incomplete payment details" }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
