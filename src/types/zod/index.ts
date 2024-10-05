import { z } from "zod";

export const ChannelSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: "チャンネルを選択してください" }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Channel = z.infer<typeof ChannelSchema>;

export const ThreadSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  user: z.string(),
  channelId: z.string(),
  tags: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Thread = z.infer<typeof ThreadSchema>;

export const DetailSchema = z.object({
  id: z.string().cuid(),
  threadId: z.string(),
  contents: z.string().nullable(),
  viewInSlackUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Detail = z.infer<typeof DetailSchema>;

export const DetailWithThreadSchema = DetailSchema.extend({
  thread: ThreadSchema.pick({ title: true, user: true, tags: true }),
});

export type DetailWithThread = z.infer<typeof DetailWithThreadSchema>;
