import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signJWT } from '@/lib/auth';

export async function POST(req) {
  const { email, password } = await req.json();

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!rows.length)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  // ---- ISSUE TOKEN AND SET COOKIE ----
  const token = signJWT({ id: user.id, email: user.email, role: user.role });
  const response = NextResponse.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });

  // Set the session_token as an HTTP-only cookie
  response.cookies.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
