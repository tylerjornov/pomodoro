import { LOFI_CHANNELS, type ChannelLiveGroup, type LiveStream, type LofiLivePayload } from "@/lib/lofi-catalog";

const INNERTUBE_URL = "https://www.youtube.com/youtubei/v1/browse?prettyPrint=false";
const DEFAULT_LIVE_PARAMS = "EgdzdHJlYW1z8gYECgJ6AA%3D%3D";
const CACHE_MS = 45_000;
const PAGE_LIMIT = 6;

const INNERTUBE_CONTEXT = {
  client: {
    clientName: "WEB",
    clientVersion: "2.20250815.01.00",
    hl: "en",
    gl: "US",
  },
};

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

let cache: { at: number; payload: LofiLivePayload } | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function walk(value: unknown, visit: (node: Record<string, unknown>) => void) {
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit);
    return;
  }
  if (!isRecord(value)) return;
  visit(value);
  for (const child of Object.values(value)) walk(child, visit);
}

function isLiveDump(dump: string): boolean {
  return dump.includes("THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE") || dump.includes('"imageName":"LIVE"') || dump.includes('"imageName": "LIVE"') || dump.includes("BADGE_STYLE_TYPE_LIVE_NOW");
}

function lockupTitle(lockup: Record<string, unknown>): string | null {
  const metadata = lockup.metadata;
  if (!isRecord(metadata)) return null;
  const view = metadata.lockupMetadataViewModel;
  if (!isRecord(view)) return null;
  const title = view.title;
  if (isRecord(title) && typeof title.content === "string") return title.content;
  return null;
}

function videoTitle(renderer: Record<string, unknown>): string | null {
  const title = renderer.title;
  if (typeof title === "string") return title;
  if (!isRecord(title)) return null;
  if (typeof title.simpleText === "string") return title.simpleText;
  if (typeof title.content === "string") return title.content;
  if (Array.isArray(title.runs)) {
    return title.runs
      .map((run) => (isRecord(run) && typeof run.text === "string" ? run.text : ""))
      .join("");
  }
  return null;
}

function extractLiveStreams(data: unknown, channelId: string, channelName: string): LiveStream[] {
  const found: LiveStream[] = [];
  const seen = new Set<string>();

  function push(videoId: unknown, title: string | null) {
    if (typeof videoId !== "string" || videoId.length !== 11 || seen.has(videoId)) return;
    seen.add(videoId);
    found.push({
      videoId,
      title: (title ?? "Untitled stream").trim() || "Untitled stream",
      channelId,
      channelName,
    });
  }

  walk(data, (node) => {
    if (isRecord(node.lockupViewModel)) {
      const lockup = node.lockupViewModel;
      if (isLiveDump(JSON.stringify(lockup))) {
        push(lockup.contentId, lockupTitle(lockup));
      }
      return;
    }
    const renderer = node.gridVideoRenderer ?? node.videoRenderer ?? node.compactVideoRenderer;
    if (isRecord(renderer) && isLiveDump(JSON.stringify(renderer))) {
      push(renderer.videoId, videoTitle(renderer));
    }
  });

  return found;
}

function extractLiveTabParams(data: unknown): string | null {
  let params: string | null = null;
  walk(data, (node) => {
    if (!isRecord(node.tabRenderer)) return;
    const tab = node.tabRenderer;
    const title = typeof tab.title === "string" ? tab.title.toLowerCase() : "";
    if (title !== "live" && title !== "streams") return;
    const endpoint = tab.endpoint;
    if (!isRecord(endpoint)) return;
    const browse = endpoint.browseEndpoint;
    if (isRecord(browse) && typeof browse.params === "string") {
      params = browse.params;
    }
  });
  return params;
}

function extractContinuation(data: unknown): string | null {
  let token: string | null = null;
  walk(data, (node) => {
    if (!isRecord(node.continuationCommand)) return;
    const value = node.continuationCommand.token;
    if (typeof value === "string") token = value;
  });
  return token;
}

async function innertubeBrowse(payload: Record<string, unknown>): Promise<unknown> {
  const res = await fetch(INNERTUBE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://www.youtube.com",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({ context: INNERTUBE_CONTEXT, ...payload }),
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) {
    throw new Error(`YouTube returned ${res.status}`);
  }
  return (await res.json()) as Json;
}

async function fetchChannelLive(channelId: string, channelName: string): Promise<LiveStream[]> {
  const home = await innertubeBrowse({ browseId: channelId });
  const params = extractLiveTabParams(home) ?? DEFAULT_LIVE_PARAMS;
  let page: unknown = await innertubeBrowse({ browseId: channelId, params });
  const streams: LiveStream[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < PAGE_LIMIT; i++) {
    const batch = extractLiveStreams(page, channelId, channelName);
    let added = 0;
    for (const item of batch) {
      if (seen.has(item.videoId)) continue;
      seen.add(item.videoId);
      streams.push(item);
      added += 1;
    }
    const token = extractContinuation(page);
    if (!token || added === 0) break;
    page = await innertubeBrowse({ continuation: token });
  }

  return streams;
}

export async function fetchAllLiveStreams(refresh = false): Promise<LofiLivePayload> {
  if (!refresh && cache && Date.now() - cache.at < CACHE_MS) {
    return cache.payload;
  }

  const groups = await Promise.all(
    LOFI_CHANNELS.map(async (channel): Promise<ChannelLiveGroup> => {
      try {
        const streams = await fetchChannelLive(channel.id, channel.name);
        return { ...channel, streams };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Could not load streams";
        return { ...channel, streams: [], error: message };
      }
    }),
  );

  const payload: LofiLivePayload = { channels: groups, fetchedAt: Date.now() };
  cache = { at: Date.now(), payload };
  return payload;
}
