import { GoogleAuth } from "google-auth-library";

const IAP_CLIENT_ID = process.env.IAP_CLIENT_ID;
const TOKEN_EXPIRATION_BUFFER = 60;

let cachedToken: string | null = null;
let tokenExpirationTime: number | null = null;

export const getIapTokenResponse = async (): Promise<string> => {
  if (!IAP_CLIENT_ID) {
    throw new Error("Missing required environment variables");
  }

  const currentTime = Math.floor(Date.now() / 1000);

  if (cachedToken && tokenExpirationTime && currentTime < tokenExpirationTime - TOKEN_EXPIRATION_BUFFER) {
    return cachedToken;
  }

  const auth = new GoogleAuth();
  const client = await auth.getIdTokenClient(IAP_CLIENT_ID);
  const tokenResponse = await client.getRequestHeaders();

  if (!tokenResponse.Authorization) {
    throw new Error("tokenResponse.Authorization is undefined");
  }

  tokenExpirationTime = currentTime + 3600;

  cachedToken = tokenResponse.Authorization;

  return cachedToken;
};
