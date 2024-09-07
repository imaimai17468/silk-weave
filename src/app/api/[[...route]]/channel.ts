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

    const parsedChannels = ChannelSchema.array().safeParse(channels);

    if (!parsedChannels.success) {
      return c.json({ error: parsedChannels.error }, 400);
    }

    return c.json(parsedChannels.data);
  })
  .post(
    "/",
    zValidator("form", ChannelSchema.pick({ name: true }), (result, c) => {
      if (!result.success) {
        return c.json({ error: result.error }, 400);
      }
    }),
    async (c) => {
      const data = c.req.valid("form");

      const channel = await prisma.channel.create({
        data: {
          name: data.name,
        },
      });

      return c.json(channel);
    }
  );
