import { client } from "@/lib/hono";
import type { Channel } from "@/types/zod";
import { map } from "remeda";

export const getChannels = async (): Promise<Channel[] | undefined> => {
  try {
    const res = await client.api.channel.$get().then((res) => res.json());

    const channels = map(res, (channel) => ({
      ...channel,
      createdAt: new Date(channel.createdAt),
      updatedAt: new Date(channel.updatedAt),
    }));

    return channels;
  } catch (error) {
    console.error("Failed to fetch channels:", error);
    return undefined;
  }
};
