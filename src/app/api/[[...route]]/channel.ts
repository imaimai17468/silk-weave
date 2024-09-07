import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ChannelSchema } from "@/types/zod";
import { connect } from "@/lib/connect";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const channelRoute = new Hono()
  .get("/", async (c) => {
    await connect();
    const channels = await prisma.channel.findMany();

    return c.json(channels);
  })
  .post("/", zValidator("form", ChannelSchema.pick({ name: true })), async (c) => {
    const data = c.req.valid("form");

    const channel = await prisma.channel.create({
      data: {
        name: data.name,
      },
    });

    return c.json(channel);
  });
