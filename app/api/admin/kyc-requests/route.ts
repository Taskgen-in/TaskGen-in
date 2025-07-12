import { NextRequest, NextResponse } from 'next/server';
import { pool } from "@/lib/db";

export async function GET() {
  console.log('KYC API called - starting...'); // Debug log
  try {
    
    // First, let's check if we can get any users at all
    const [allUsers]: any = await pool.query(`
      SELECT COUNT(*) as total_users FROM task.users WHERE role = 'user'
    `);
    console.log('Total users with role="user":', allUsers[0]?.total_users);
    
    // Let's also check what columns exist in the users table
    const [userSample]: any = await pool.query(`
      SELECT * FROM task.users LIMIT 1
    `);
    console.log('Sample user data:', userSample[0]);
    
    // Fetch KYC requests from users table where KYC verification is pending or incomplete
    const [rows]: any = await pool.query(`
      SELECT 
        u.id,
        u.name as userName,
        u.email,
        u.phone,
        u.kyc_verified,
        u.is_verified,
        u.mobile_verified,
        u.payment_setup,
        u.upi_id,
        u.bank_name,
        u.bank_account,
        u.ifsc_code,
        u.created_at as submittedDate,
        u.status
      FROM task.users u
      WHERE u.role = 'user' 
      AND (u.kyc_verified = 0 OR u.is_verified = 0 OR u.mobile_verified = 0 OR u.payment_setup = 0)
      ORDER BY u.created_at DESC
    `);
    
    console.log('KYC query result:', rows); // Debug log

    const kycRequests = rows.map((user: any) => {
      // Determine KYC status
      let status = "pending";
      if (user.kyc_verified === 1 && user.is_verified === 1 && user.mobile_verified === 1 && user.payment_setup === 1) {
        status = "verified";
      } else if (user.kyc_verified === 0 && user.is_verified === 0) {
        status = "incomplete";
      }

      // Determine documents submitted
      const documents = [];
      if (user.kyc_verified === 1) documents.push("KYC Verified");
      if (user.is_verified === 1) documents.push("Account Verified");
      if (user.mobile_verified === 1) documents.push("Mobile Verified");
      if (user.payment_setup === 1) documents.push("Payment Setup");

      // Determine payment method
      let paymentMethod = "";
      if (user.upi_id) {
        paymentMethod = `UPI: ${user.upi_id}`;
      } else if (user.bank_account && user.bank_name) {
        paymentMethod = `Bank: ${user.bank_name} - ${user.bank_account}`;
      }

      return {
        id: user.id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        submittedDate: new Date(user.submittedDate).toISOString().split('T')[0],
        documents: documents.length > 0 ? documents : ["Pending"],
        upiId: user.upi_id || null,
        bankAccount: user.bank_account ? `${user.bank_name} - ${user.bank_account}` : null,
        status: status,
        kycVerified: user.kyc_verified === 1,
        isVerified: user.is_verified === 1,
        mobileVerified: user.mobile_verified === 1,
        paymentSetup: user.payment_setup === 1
      };
    });
    
    console.log('KYC requests processed:', kycRequests); // Debug log

    // If no KYC requests found, return a test response
    if (kycRequests.length === 0) {
      console.log('No KYC requests found, returning test data');
      return NextResponse.json([
        {
          id: 1,
          userName: "Test User",
          email: "test@example.com",
          phone: "+91 98765 43210",
          submittedDate: "2024-01-20",
          documents: ["Pending"],
          upiId: null,
          bankAccount: null,
          status: "pending",
          kycVerified: false,
          isVerified: false,
          mobileVerified: false,
          paymentSetup: false
        }
      ]);
    }

    return NextResponse.json(kycRequests);

  } catch (error) {
    console.error('Error fetching KYC requests:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { error: 'Failed to fetch KYC requests', details: error.message },
      { status: 500 }
    );
  }
} 