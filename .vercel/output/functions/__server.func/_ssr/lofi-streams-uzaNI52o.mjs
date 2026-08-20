import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { t as LOFI_CHANNELS } from "./lofi-catalog-C-rOPM07.mjs";
import { i as object, t as boolean } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lofi-streams-uzaNI52o.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var INNERTUBE_URL = "https://www.youtube.com/youtubei/v1/browse?prettyPrint=false";
var DEFAULT_LIVE_PARAMS = "EgdzdHJlYW1z8gYECgJ6AA%3D%3D";
var CACHE_MS = 45e3;
var PAGE_LIMIT = 6;
var INNERTUBE_CONTEXT = { client: {
	clientName: "WEB",
	clientVersion: "2.20250815.01.00",
	hl: "en",
	gl: "US"
} };
var cache = null;
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
function walk(value, visit) {
	if (Array.isArray(value)) {
		for (const item of value) walk(item, visit);
		return;
	}
	if (!isRecord(value)) return;
	visit(value);
	for (const child of Object.values(value)) walk(child, visit);
}
function isLiveDump(dump) {
	return dump.includes("THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE") || dump.includes("\"imageName\":\"LIVE\"") || dump.includes("\"imageName\": \"LIVE\"") || dump.includes("BADGE_STYLE_TYPE_LIVE_NOW");
}
function lockupTitle(lockup) {
	const metadata = lockup.metadata;
	if (!isRecord(metadata)) return null;
	const view = metadata.lockupMetadataViewModel;
	if (!isRecord(view)) return null;
	const title = view.title;
	if (isRecord(title) && typeof title.content === "string") return title.content;
	return null;
}
function videoTitle(renderer) {
	const title = renderer.title;
	if (typeof title === "string") return title;
	if (!isRecord(title)) return null;
	if (typeof title.simpleText === "string") return title.simpleText;
	if (typeof title.content === "string") return title.content;
	if (Array.isArray(title.runs)) return title.runs.map((run) => isRecord(run) && typeof run.text === "string" ? run.text : "").join("");
	return null;
}
function extractLiveStreams(data, channelId, channelName) {
	const found = [];
	const seen = /* @__PURE__ */ new Set();
	function push(videoId, title) {
		if (typeof videoId !== "string" || videoId.length !== 11 || seen.has(videoId)) return;
		seen.add(videoId);
		found.push({
			videoId,
			title: (title ?? "Untitled stream").trim() || "Untitled stream",
			channelId,
			channelName
		});
	}
	walk(data, (node) => {
		if (isRecord(node.lockupViewModel)) {
			const lockup = node.lockupViewModel;
			if (isLiveDump(JSON.stringify(lockup))) push(lockup.contentId, lockupTitle(lockup));
			return;
		}
		const renderer = node.gridVideoRenderer ?? node.videoRenderer ?? node.compactVideoRenderer;
		if (isRecord(renderer) && isLiveDump(JSON.stringify(renderer))) push(renderer.videoId, videoTitle(renderer));
	});
	return found;
}
function extractLiveTabParams(data) {
	let params = null;
	walk(data, (node) => {
		if (!isRecord(node.tabRenderer)) return;
		const tab = node.tabRenderer;
		const title = typeof tab.title === "string" ? tab.title.toLowerCase() : "";
		if (title !== "live" && title !== "streams") return;
		const endpoint = tab.endpoint;
		if (!isRecord(endpoint)) return;
		const browse = endpoint.browseEndpoint;
		if (isRecord(browse) && typeof browse.params === "string") params = browse.params;
	});
	return params;
}
function extractContinuation(data) {
	let token = null;
	walk(data, (node) => {
		if (!isRecord(node.continuationCommand)) return;
		const value = node.continuationCommand.token;
		if (typeof value === "string") token = value;
	});
	return token;
}
async function innertubeBrowse(payload) {
	const res = await fetch(INNERTUBE_URL, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			origin: "https://www.youtube.com",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
		},
		body: JSON.stringify({
			context: INNERTUBE_CONTEXT,
			...payload
		}),
		signal: AbortSignal.timeout(12e3)
	});
	if (!res.ok) throw new Error(`YouTube returned ${res.status}`);
	return await res.json();
}
async function fetchChannelLive(channelId, channelName) {
	let page = await innertubeBrowse({
		browseId: channelId,
		params: extractLiveTabParams(await innertubeBrowse({ browseId: channelId })) ?? DEFAULT_LIVE_PARAMS
	});
	const streams = [];
	const seen = /* @__PURE__ */ new Set();
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
async function fetchAllLiveStreams(refresh = false) {
	if (!refresh && cache && Date.now() - cache.at < CACHE_MS) return cache.payload;
	const payload = {
		channels: await Promise.all(LOFI_CHANNELS.map(async (channel) => {
			try {
				const streams = await fetchChannelLive(channel.id, channel.name);
				return {
					...channel,
					streams
				};
			} catch (err) {
				const message = err instanceof Error ? err.message : "Could not load streams";
				return {
					...channel,
					streams: [],
					error: message
				};
			}
		})),
		fetchedAt: Date.now()
	};
	cache = {
		at: Date.now(),
		payload
	};
	return payload;
}
var getLofiLiveStreams_createServerFn_handler = createServerRpc({
	id: "7efecebece339662411ed713b9036700cc9cddc6c36c3da0264101774b8b4400",
	name: "getLofiLiveStreams",
	filename: "src/lib/lofi-streams.ts"
}, (opts) => getLofiLiveStreams.__executeServer(opts));
var getLofiLiveStreams = createServerFn({ method: "GET" }).validator(object({ refresh: boolean().optional() }).optional()).handler(getLofiLiveStreams_createServerFn_handler, async ({ data }) => {
	return fetchAllLiveStreams(Boolean(data?.refresh));
});
//#endregion
export { getLofiLiveStreams_createServerFn_handler };
