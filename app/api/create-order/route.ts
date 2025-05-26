import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  // Parse body
  const { amount, currency = "INR", receipt = "receipt#1" } = await req.json();

  // Always instantiate Razorpay client **inside** the function!
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // Amount in paise
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: "Order creation failed", details: err.message }, { status: 500 });
  }
}

// No GET handler need
