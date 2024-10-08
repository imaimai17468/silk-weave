import type { AppType } from "@/app/api/[[...route]]/route";
import { getIapTokenResponse } from "@/utils/get-iap-token";
import { hc } from "hono/client";

export const useHonoClient = async () => {
  const iapTokenResponse = await getIapTokenResponse();

  const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL ?? "", {
    headers: {
      Authorization: iapTokenResponse,
    },
  });

  return client;
};
