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
    // Fetch user profile information from users table
    const [userRows] = await pool.query(
      `SELECT 
        name,
        email,
        phone,
        role,
        plan,
        upi_id,
        bank_account,
        bank_ifsc,
        bank_name,
        account_holder_name,
        kyc_verified,
        status,
        created_at,
        updated_at,
        is_verified,
        mobile_verified,
        payment_setup
      FROM users 
      WHERE id = ?`,
      [payload.id]
    );

    const user = (userRows as any[])[0];

    // Fetch account statistics from user_tasks table (if it exists)
    let stats = {
      totalTasks: 0,
      completedTasks: 0,
      totalEarned: 0,
      avgRating: 0,
      tasksThisMonth: 0
    };

    try {
      const [statsRows] = await pool.query(
        `SELECT 
          COUNT(*) as total_tasks,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
          SUM(CASE WHEN status = 'completed' THEN payout ELSE 0 END) as total_earned,
          AVG(CASE WHEN status = 'completed' THEN rating ELSE NULL END) as avg_rating,
          COUNT(CASE WHEN completed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as tasks_this_month
        FROM user_tasks 
        WHERE user_id = ?`,
        [payload.id]
      );

      const statsData = (statsRows as any[])[0];
      if (statsData) {
        stats = {
          totalTasks: statsData.total_tasks || 0,
          completedTasks: statsData.completed_tasks || 0,
          totalEarned: statsData.total_earned || 0,
          avgRating: statsData.avg_rating || 0,
          tasksThisMonth: statsData.tasks_this_month || 0
        };
      }
    } catch (statsError) {
      // If user_tasks table doesn't exist, use default stats
      console.log("Stats table not available, using defaults");
    }

    // Build payment methods from user data
    const paymentMethods = [];
    
    // Add UPI if available
    if (user?.upi_id) {
      paymentMethods.push({
        type: "UPI",
        details: user.upi_id,
        isPrimary: true,
        isVerified: user.payment_setup === 1,
        createdAt: user.created_at
      });
    }

    // Add bank account if available
    if (user?.bank_account) {
      paymentMethods.push({
        type: "Bank Transfer",
        details: `${user.bank_name} - ${user.bank_account}`,
        isPrimary: !user.upi_id, // Primary if no UPI
        isVerified: user.payment_setup === 1,
        createdAt: user.created_at
      });
    }

    // Build bank account object
    let bankAccount = null;
    if (user?.bank_account && user?.bank_name) {
      bankAccount = {
        accountHolder: user.account_holder_name || user.name,
        bankName: user.bank_name,
        accountNumber: user.bank_account,
        ifscCode: user.bank_ifsc || user.ifsc_code,
        accountType: "Savings", // Default
        branch: "Main Branch", // Default
        isVerified: user.payment_setup === 1
      };
    }

    return NextResponse.json({
      profile: {
        name: user?.name || "User",
        email: user?.email || "",
        mobile: user?.phone || "",
        dateOfBirth: null, // Not available in schema
        gender: null, // Not available in schema
        address: null, // Not available in schema
        panNumber: null, // Not available in schema
        aadhaarNumber: null, // Not available in schema
        memberLevel: user?.plan === "premium" ? "Premium" : "Free",
        createdAt: user?.created_at,
        lastLogin: user?.updated_at,
        role: user?.role || "user",
        status: user?.status || "active",
        isVerified: user?.is_verified === 1,
        mobileVerified: user?.mobile_verified === 1,
        kycVerified: user?.kyc_verified === 1,
        paymentSetup: user?.payment_setup === 1
      },
      paymentMethods,
      bankAccount,
      stats
    });
  } catch (error) {
    console.error("Account API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 