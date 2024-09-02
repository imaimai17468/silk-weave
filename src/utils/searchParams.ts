import { createSearchParamsCache, createSerializer, parseAsString } from "nuqs/server";

export const searchParams = {
  channelId: parseAsString,
  threadId: parseAsString,
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
