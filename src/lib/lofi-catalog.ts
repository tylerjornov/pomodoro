export type LofiChannel = {
  id: string;
  name: string;
  handle: string;
};

export const LOFI_CHANNELS: LofiChannel[] = [
  { id: "UCV03SRZXJEz-hchIAogeJOg", name: "Claude", handle: "@claude" },
  { id: "UCZlJ1VMQEnZhs7SRfJBExwg", name: "Catholic Lofi", handle: "@catholiclofi" },
  { id: "UCOxqgCwgOqC2lMqC5PYz_Dg", name: "Chillhop", handle: "@ChillhopMusic" },
];

export type LiveStream = {
  videoId: string;
  title: string;
  channelId: string;
  channelName: string;
};

export type ChannelLiveGroup = {
  id: string;
  name: string;
  handle: string;
  streams: LiveStream[];
  error?: string;
};

export type LofiLivePayload = {
  channels: ChannelLiveGroup[];
  fetchedAt: number;
};
