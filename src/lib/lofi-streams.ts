import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchAllLiveStreams } from "@/lib/youtube-live";

export const getLofiLiveStreams = createServerFn({ method: "GET" })
  .validator(z.object({ refresh: z.boolean().optional() }).optional())
  .handler(async ({ data }) => {
    return fetchAllLiveStreams(Boolean(data?.refresh));
  });
