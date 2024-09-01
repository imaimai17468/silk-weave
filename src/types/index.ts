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

export const ChannelScalarFieldEnumSchema = z.enum(["id", "name"]);

export const ThreadScalarFieldEnumSchema = z.enum(["id", "title", "date", "user", "channelId", "tags"]);

export const DetailScalarFieldEnumSchema = z.enum(["id", "threadId", "contents", "viewInSlackUrl"]);

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
  name: z.string(),
});

export type Channel = z.infer<typeof ChannelSchema>;

/////////////////////////////////////////
// THREAD SCHEMA
/////////////////////////////////////////

export const ThreadSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  date: z.coerce.date(),
  user: z.string(),
  channelId: z.string(),
  tags: z.string().array(),
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
});

export type Detail = z.infer<typeof DetailSchema>;
