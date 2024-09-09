import { connect } from "@/lib/connect";
import { DetailSchema } from "@/types/zod";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const prisma = new PrismaClient();

export const detailRoute = new Hono().get("/", async (c) => {
  const { threadId } = c.req.query();

  if (!threadId) {
    return c.json({ error: "threadId is required" }, 400);
  }

  await connect();
  const detail = await prisma.detail.findMany({
    where: {
      threadId,
    },
  });

  const parsedDetails = DetailSchema.array().safeParse(detail);

  if (!parsedDetails.success) {
    return c.json({ error: parsedDetails.error }, 400);
  }

  return c.json(parsedDetails.data);
});
