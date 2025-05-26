import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const [existing] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
  if (existing.length) return NextResponse.json({ error: "Email already used" }, { status: 400 });

  const hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')",
    [name, email, hash]
  );
  const userId = result.insertId;
  const jwt = signJWT({ id: userId, email });

  const res = NextResponse.json({ success: true });
  res.cookies.set("session_token", jwt, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
