export const MAPS_ENABLED = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

export function getMapsApiKey(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
}

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!process.env.GOOGLE_MAPS_SERVER_KEY) return null;
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_SERVER_KEY}`,
    );
    const data = await response.json();
    if (data.results?.[0]?.geometry?.location) {
      return data.results[0].geometry.location;
    }
  } catch {
    return null;
  }
  return null;
}

export function getDirectionsUrl(pickup: string, dropoff: string): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(dropoff)}`;
}
