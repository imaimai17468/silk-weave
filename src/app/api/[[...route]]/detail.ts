import { connect } from "@/lib/connect";
import { DetailWithThreadSchema } from "@/types/detail-with-thread";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const prisma = new PrismaClient();

export const detailRoute = new Hono().get("/", async (c) => {
  const { threadId } = c.req.query();

  if (!threadId) {
    return c.json({ error: "threadId is required" }, 400);
  }

  await connect();
  const detail = await prisma.detail.findUnique({
    where: {
      threadId,
    },
    include: {
      thread: {
        select: {
          title: true,
          user: true,
          tags: true,
        },
      },
    },
  });

  const parsedDetail = DetailWithThreadSchema.safeParse(detail);

  if (!parsedDetail.success) {
    return c.json({ error: parsedDetail.error }, 400);
  }

  return c.json(parsedDetail.data);
});
