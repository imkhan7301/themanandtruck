import twilio from "twilio";

export const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export async function sendSMS(to: string, message: string): Promise<void> {
  if (!twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
    console.log(`[SMS] To: ${to} | Message: ${message}`);
    return;
  }
  await twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
}

export async function sendBookingNotificationSMS(phone: string, bookingNumber: string): Promise<void> {
  await sendSMS(
    phone,
    `The Man & Truck: Your booking ${bookingNumber} is confirmed! We're dispatching your driver. Track at themanandtruck.com`,
  );
}
