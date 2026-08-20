import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link2, RefreshCw, Unplug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LOFI_CHANNELS, type ChannelLiveGroup, type LofiLivePayload } from "@/lib/lofi-catalog";
import { fetchStaticLofiCatalog, hasStreams } from "@/lib/lofi-static";
import { getLofiLiveStreams } from "@/lib/lofi-streams";
import { parseYouTubeId, youtubeEmbedSrc } from "@/lib/youtube";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "still-lofi-v2";

type Saved = {
  videoId: string | null;
  draft: string;
};

function loadSaved(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Saved;
      if (parsed && typeof parsed === "object") {
        return {
          videoId: typeof parsed.videoId === "string" ? parsed.videoId : null,
          draft: typeof parsed.draft === "string" ? parsed.draft : "",
        };
      }
    }
    const legacy = localStorage.getItem("still-lofi-url");
    if (legacy) {
      const id = parseYouTubeId(legacy);
      return { videoId: id, draft: legacy };
    }
  } catch {
    // ignore storage errors
  }
  return { videoId: null, draft: "" };
}

function persist(saved: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {
    // ignore storage errors
  }
}

export function LofiEmbed({ initialCatalog = null }: { initialCatalog?: LofiLivePayload | null }) {
  const [draft, setDraft] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<LofiLivePayload | null>(
    hasStreams(initialCatalog) ? initialCatalog : null,
  );
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!hasStreams(initialCatalog));

  const loadCatalog = useCallback(async (refresh = false) => {
    setLoading(true);
    setCatalogError(null);
    try {
      try {
        const payload = await getLofiLiveStreams(refresh ? { data: { refresh: true } } : undefined);
        if (hasStreams(payload)) {
          setCatalog(payload);
          return;
        }
      } catch {
        // Static hosts (GitHub Pages) have no server functions.
      }
      const snapshot = await fetchStaticLofiCatalog();
      if (!hasStreams(snapshot)) {
        throw new Error("None of these channels are live right now.");
      }
      setCatalog(snapshot);
    } catch (err) {
      setCatalogError(err instanceof Error ? err.message : "Could not load livestreams.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = loadSaved();
    setVideoId(saved.videoId);
    setDraft(saved.draft);
    if (!hasStreams(initialCatalog)) void loadCatalog();
  }, [initialCatalog, loadCatalog]);

  function selectStream(id: string, title?: string) {
    setVideoId(id);
    setError(null);
    if (title) setDraft(title);
    persist({ videoId: id, draft: title ?? draft });
  }

  function connect(e: FormEvent) {
    e.preventDefault();
    const id = parseYouTubeId(draft);
    if (!id) {
      setError("Paste a YouTube video or live URL.");
      return;
    }
    setError(null);
    setVideoId(id);
    persist({ videoId: id, draft: draft.trim() });
  }

  function disconnect() {
    setVideoId(null);
    setDraft("");
    setError(null);
    persist({ videoId: null, draft: "" });
  }

  const groups: ChannelLiveGroup[] =
    catalog?.channels ?? LOFI_CHANNELS.map((ch) => ({ ...ch, streams: [] }));
  const liveCount = groups.reduce((sum, ch) => sum + ch.streams.length, 0);

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <h2 className="font-display text-lg font-medium tracking-tight">Lofi</h2>
          <p className="text-xs font-medium tracking-wide text-muted tabular-nums">
            {loading ? "Loading" : `${liveCount} live`}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Refresh livestreams"
          onClick={() => void loadCatalog(true)}
          disabled={loading}
        >
          <RefreshCw className={loading ? "animate-spin" : undefined} />
        </Button>
      </div>

      <fieldset className="mb-4 max-h-60 overflow-y-auto rounded-md border border-border bg-bg/50 p-2">
        <legend className="sr-only">Livestreams from Claude, Catholic Lofi, and Chillhop</legend>
        {catalogError ? (
          <p className="px-2 py-3 text-sm text-muted">{catalogError}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {groups.map((channel) => (
              <div key={channel.id}>
                <p className="px-2 pb-1 text-xs font-medium tracking-wide text-muted">{channel.name}</p>
                {loading && !catalog ? (
                  <div className="mx-2 h-10 rounded-sm bg-elevated" />
                ) : channel.streams.length === 0 ? (
                  <p className="px-2 py-2 text-sm text-subtle">
                    {channel.error ? "Could not load this channel." : "None live right now."}
                  </p>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {channel.streams.map((stream) => {
                      const selected = videoId === stream.videoId;
                      return (
                        <li key={stream.videoId}>
                          <button
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => selectStream(stream.videoId, stream.title)}
                            className={cn(
                              "flex min-h-11 w-full items-center gap-3 rounded-md px-2 py-2 text-left",
                              "transition-colors duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]",
                              selected ? "bg-elevated text-fg" : "text-fg hover:bg-elevated/70",
                            )}
                          >
                            <span
                              className={cn(
                                "size-2 shrink-0 rounded-full",
                                selected ? "bg-primary" : "bg-border",
                              )}
                              aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1 text-sm leading-snug">{stream.title}</span>
                            <span className="shrink-0 text-xs font-medium tracking-widest text-muted uppercase">
                              Live
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </fieldset>

      <div className="relative aspect-video overflow-hidden rounded-md bg-elevated">
        {videoId ? (
          <iframe
            src={youtubeEmbedSrc(videoId)}
            title="Lofi livestream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="origin"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <p className="text-sm text-subtle">Pick a livestream, or paste a URL below.</p>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      <form onSubmit={connect} className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Or paste a YouTube URL"
          aria-label="YouTube livestream URL"
          aria-invalid={error ? true : undefined}
          inputMode="url"
          autoComplete="url"
        />
        <Button type="submit" size="icon" variant="secondary" aria-label="Connect stream">
          <Link2 />
        </Button>
        {videoId ? (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Disconnect stream"
            onClick={disconnect}
          >
            <Unplug />
          </Button>
        ) : null}
      </form>
      {error ? <p className="mt-2 text-sm text-muted">{error}</p> : null}
    </section>
  );
}
