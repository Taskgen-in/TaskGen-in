import { pool } from '@/lib/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

// Utility to send branded OTP email
async function sendOtpEmail(to: string, otp: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 587,
    secure: false,
    auth: { user: "support@taskgen.in", pass: "lxo?Idt3" },
  });

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Login Verification Code</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body style="font-family: Arial, sans-serif; background: #f7fafc; margin: 0; padding: 0;">
      <table width="100%" bgcolor="#f7fafc" cellpadding="0" cellspacing="0" border="0" style="padding: 32px 0;">
        <tr>
          <td align="center">
            <table width="480" cellpadding="0" cellspacing="0" border="0" style="background: #fff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); padding: 32px;">
              <tr>
                <td align="center" style="padding-bottom: 18px;">
                  <img src="https://taskgen.in/logo.png" alt="TaskGen Logo" width="80" height="80" style="border-radius: 50%; box-shadow:0 1px 4px #eee; margin-bottom: 8px;" />
                  <h2 style="margin: 0; color: #2563eb; letter-spacing: 1px;">TaskGen.in</h2>
                </td>
              </tr>
              <tr>
                <td style="font-size: 20px; color: #222; padding-bottom: 12px;">
                  Login Verification Code
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #333; padding-bottom: 20px;">
                  Hello,<br><br>
                  Use this code to complete your login process:
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-bottom: 24px;">
                  <div style="display:inline-block; background:#f1f5f9; color:#2563eb; font-size:28px; font-weight:700; padding:12px 36px; border-radius:6px; letter-spacing: 4px;">
                    ${otp}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="font-size: 15px; color: #555; padding-bottom: 16px;">
                  This code will expire in 10 minutes for security reasons.
                </td>
              </tr>
              <tr>
                <td style="font-size: 14px; color: #555; padding-bottom: 20px;">
                  If you didn't request this code, please ignore this email.
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:12px; color:#bbb; padding-top:10px; border-top:1px solid #eee;">
                  &copy; 2025 <a href="https://taskgen.in" style="color:#bbb; text-decoration:none;">TaskGen.in</a>. All rights reserved.<br>
                  <span style="color:#bbb;">This is an automated message, please do not reply to this email.</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  await transporter.sendMail({
    from: '"TaskGen" <support@taskgen.in>',
    to,
    subject: "Your OTP for Email Verification",
    html,
  });
}

// POST /api/register
export async function POST(req: Request) {
  try {
    const { name, email, mobile, password } = await req.json()
    if (!name || !email || !mobile || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // Check if already exists
    const [exists] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR phone = ?',
      [email, mobile]
    )
    if (exists.length > 0) {
      return NextResponse.json({ error: 'Email or mobile already registered.' }, { status: 409 })
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10)

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60000) // 10 minutes

    // Insert user with is_verified = 0
    const [result] = await pool.query(
      'INSERT INTO users (name, email, phone, password, role, plan, kyc_verified, status, is_verified, otp_code, otp_expires) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, mobile, hash, 'user', 'free', 0, 'active', 0, otp, otpExpiry]
    )

    // Send OTP email
    await sendOtpEmail(email, otp)

    return NextResponse.json({
      success: true,
      message: "Registration successful. Please check your email for the OTP.",
      user_id: result.insertId
    })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
