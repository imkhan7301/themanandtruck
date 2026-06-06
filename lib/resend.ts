import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendBookingConfirmation(email: string, bookingNumber: string, totalPrice: number): Promise<void> {
  if (!resend) {
    console.log(`[Email] Booking confirmation for ${email}: ${bookingNumber}`);
    return;
  }
  await resend.emails.send({
    from: "The Man & Truck <noreply@themanandtruck.com>",
    to: email,
    subject: `Booking Confirmed — ${bookingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0F172A; color: #F8FAFC; padding: 32px; border-radius: 12px;">
        <h1 style="color: #F59E0B;">Your Load. Our Mission. ✓</h1>
        <p>Your booking <strong>${bookingNumber}</strong> is confirmed!</p>
        <p>Total: <strong style="color: #F59E0B;">$${totalPrice.toFixed(2)}</strong></p>
        <p>We're finding the nearest verified driver for you now.</p>
        <a href="https://themanandtruck.com/client/bookings" style="background: #F59E0B; color: #0F172A; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Track Your Booking</a>
        <p style="margin-top: 32px; color: rgba(255,255,255,0.5); font-size: 12px;">The Man & Truck — On Time. Every Time. InshAllah.</p>
      </div>
    `,
  });
}
