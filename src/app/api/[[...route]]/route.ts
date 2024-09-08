import { Hono } from "hono";
import { handle } from "hono/vercel";

import { channelRoute } from "./channel";
import { threadRoute } from "./thread";

const app = new Hono().basePath("/api");
const route = app.route("/channel", channelRoute).route("/thread", threadRoute);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
