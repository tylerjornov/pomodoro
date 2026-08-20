import type { LofiLivePayload } from "@/lib/lofi-catalog";

function hasStreams(payload: LofiLivePayload | null | undefined): boolean {
  return Boolean(payload?.channels.some((channel) => channel.streams.length > 0));
}

export { hasStreams };

export async function fetchStaticLofiCatalog(): Promise<LofiLivePayload> {
  const base = import.meta.env.BASE_URL || "/";
  const url = `${base.endsWith("/") ? base : `${base}/`}lofi-live.json`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Could not load livestreams.");
  }
  const payload = (await res.json()) as LofiLivePayload;
  if (!payload || !Array.isArray(payload.channels)) {
    throw new Error("Could not load livestreams.");
  }
  return payload;
}
