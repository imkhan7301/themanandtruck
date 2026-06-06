import Pusher from "pusher";
import PusherJS from "pusher-js";

export const pusherServer = process.env.PUSHER_APP_ID
  ? new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY ?? "",
      secret: process.env.PUSHER_SECRET ?? "",
      cluster: process.env.PUSHER_CLUSTER ?? "us2",
      useTLS: true,
    })
  : null;

export function getPusherClient() {
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_PUSHER_KEY) return null;
  return new PusherJS(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "us2",
  });
}
