import { useHonoClient } from "@/lib/hono";
import { ThreadSchema } from "@/types/zod";
import type { Thread } from "@prisma/client";
import { map } from "remeda";

type props = {
  channelId: string;
};

export const getThreads = async ({ channelId }: props): Promise<Thread[] | undefined> => {
  const client = await useHonoClient();

  try {
    const res = await client.api.thread.$get({
      query: {
        channelId,
      },
    });

    if (!res.ok) {
      throw new Error(`status: ${res.status} Failed to fetch channels: ${res.statusText}`);
    }

    const data = map(await res.json(), (channel) => ({
      ...channel,
      createdAt: new Date(channel.createdAt),
      updatedAt: new Date(channel.updatedAt),
    }));

    const threads = ThreadSchema.array().safeParse(data);

    if (!threads.success) {
      throw new Error("Failed to parse channels");
    }

    return threads.data;
  } catch (error) {
    console.error("Failed to fetch channels:", error);
    return undefined;
  }
};
