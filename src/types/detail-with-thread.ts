import type { z } from "zod";
import { DetailSchema } from "./zod";
import { ThreadSchema } from "./zod";

export const DetailWithThreadSchema = DetailSchema.extend({
  thread: ThreadSchema.pick({ title: true, user: true, tags: true }),
});

export type DetailWithThread = z.infer<typeof DetailWithThreadSchema>;
