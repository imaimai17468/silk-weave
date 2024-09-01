import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const ChannelScalarFieldEnumSchema = z.enum(["id", "name", "createdAt", "updatedAt"]);

export const ThreadScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "user",
  "channelId",
  "tags",
  "createdAt",
  "updatedAt",
]);

export const DetailScalarFieldEnumSchema = z.enum([
  "id",
  "threadId",
  "contents",
  "viewInSlackUrl",
  "createdAt",
  "updatedAt",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CHANNEL SCHEMA
/////////////////////////////////////////

export const ChannelSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: "チャンネルを選択してください" }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Channel = z.infer<typeof ChannelSchema>;

/////////////////////////////////////////
// THREAD SCHEMA
/////////////////////////////////////////

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

/////////////////////////////////////////
// DETAIL SCHEMA
/////////////////////////////////////////

export const DetailSchema = z.object({
  id: z.string().cuid(),
  threadId: z.string(),
  contents: z.string().nullable(),
  viewInSlackUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Detail = z.infer<typeof DetailSchema>;
