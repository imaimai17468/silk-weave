import { client } from "@/lib/hono";
import type { Channel } from "@/types/zod";
import { ChannelSchema } from "@/types/zod";
import { map } from "remeda";

export const getChannels = async (): Promise<Channel[] | undefined> => {
  try {
    const res = await client.api.channel
      .$get()
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(`Failed to fetch channels: ${error}`);
      });

    const data = map(res, (channel) => ({
      ...channel,
      createdAt: new Date(channel.createdAt),
      updatedAt: new Date(channel.updatedAt),
    }));

    const channels = ChannelSchema.array().safeParse(data);

    if (!channels.success) {
      throw new Error("Failed to parse channels");
    }

    return channels.data;
  } catch (error) {
    console.error("Failed to fetch channels:", error);
    return undefined;
  }
};
