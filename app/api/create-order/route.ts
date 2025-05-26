// /api/create-order
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  const { amount, currency, receipt } = req.body;
  const options = {
    amount: amount * 100, // ₹199 = 19900 paise
    currency: currency || "INR",
    receipt: receipt || "receipt#1",
  };
  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Order creation failed" });
  }
}
