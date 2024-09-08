import { connect } from "@/lib/connect";
import { ThreadSchema } from "@/types/zod";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const prisma = new PrismaClient();

export const threadRoute = new Hono().get("/", async (c) => {
  const { channelId } = c.req.query();

  if (!channelId) {
    return c.json({ error: "channelId is required" }, 400);
  }

  await connect();
  const threads = await prisma.thread.findMany({
    where: {
      channelId,
    },
  });

  const parsedThreads = ThreadSchema.array().safeParse(threads);

  if (!parsedThreads.success) {
    return c.json({ error: parsedThreads.error }, 400);
  }

  return c.json(parsedThreads.data);
});
