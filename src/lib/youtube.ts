const VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/;
const YT_HOSTS = new Set([
  "youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtube-nocookie.com",
  "youtu.be",
]);

export function parseYouTubeId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (VIDEO_ID.test(trimmed)) return trimmed;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  if (!YT_HOSTS.has(host)) return null;

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return VIDEO_ID.test(id) ? id : null;
  }

  const fromQuery = url.searchParams.get("v");
  if (fromQuery && VIDEO_ID.test(fromQuery)) return fromQuery;

  const parts = url.pathname.split("/").filter(Boolean);
  const kind = parts.findIndex((p) => p === "embed" || p === "live" || p === "shorts" || p === "v");
  const nested = kind >= 0 ? (parts[kind + 1] ?? "") : "";
  if (VIDEO_ID.test(nested)) return nested;

  return null;
}

export function youtubeEmbedSrc(videoId: string): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}
