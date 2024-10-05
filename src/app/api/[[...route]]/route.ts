import { Hono } from "hono";
import { handle } from "hono/vercel";

import { channelRoute } from "./channel";
import { detailRoute } from "./detail";
import { threadRoute } from "./thread";

const app = new Hono().basePath("/api");
const route = app.route("/channel", channelRoute).route("/thread", threadRoute).route("/detail", detailRoute);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
