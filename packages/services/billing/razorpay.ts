import Razorpay from "razorpay";
import { env } from "../env";

let razorpay: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
  }

  return razorpay;
}