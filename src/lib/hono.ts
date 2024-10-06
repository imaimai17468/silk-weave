import type { AppType } from "@/app/api/[[...route]]/route";
import { getIapToken } from "@/utils/get-iap-token";
import { hc } from "hono/client";

export const useHonoClient = async () => {
  const iapToken = await getIapToken();

  const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL ?? "", {
    headers: {
      Authorization: `Bearer ${iapToken}`,
    },
  });

  return client;
};
