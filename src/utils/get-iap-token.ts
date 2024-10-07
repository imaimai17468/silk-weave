import { GoogleAuth } from "google-auth-library";

const IAP_CLIENT_ID = process.env.IAP_CLIENT_ID;

export const getIapToken = async () => {
  if (!IAP_CLIENT_ID) {
    throw new Error("Missing required environment variables");
  }

  const auth = new GoogleAuth();
  const client = await auth.getIdTokenClient(IAP_CLIENT_ID);

  return client.idTokenProvider.fetchIdToken(IAP_CLIENT_ID);
};
