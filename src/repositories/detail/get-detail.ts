import { client } from "@/lib/hono";
import { type DetailWithThread, DetailWithThreadSchema } from "@/types/zod";

type Props = {
  threadId: string;
};

export const getDetail = async ({ threadId }: Props): Promise<DetailWithThread | undefined> => {
  try {
    const res = await client.api.detail.$get({
      query: {
        threadId,
      },
    });

    if (!res.ok) {
      throw new Error(`Status: ${res.status} - Failed to fetch detail: ${res.statusText}`);
    }

    const data = await res.json();

    const parsedDetail = DetailWithThreadSchema.safeParse({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });

    if (!parsedDetail.success) {
      console.error("Failed to parse detail:", parsedDetail.error);
      throw new Error("Failed to parse detail");
    }

    return parsedDetail.data;
  } catch (error) {
    console.error("Failed to fetch detail:", error);
    return undefined;
  }
};
