import { GoogleAuth } from "google-auth-library";

const IAP_CLIENT_ID = process.env.IAP_CLIENT_ID;

export const getIapTokenResponse = async (): Promise<string> => {
  if (!IAP_CLIENT_ID) {
    throw new Error("Missing required environment variables");
  }

  const auth = new GoogleAuth();
  const client = await auth.getIdTokenClient(IAP_CLIENT_ID);
  const tokenResponse = await client.getRequestHeaders();

  if (!tokenResponse.Authorization) {
    throw new Error("tokenResponse.Authorization is undefined");
  }

  return tokenResponse.Authorization;
};
