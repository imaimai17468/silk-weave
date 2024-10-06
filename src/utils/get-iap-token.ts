import * as jwt from "jsonwebtoken";

const PRIVATE_KEY_ID = process.env.IAP_PRIVATE_KEY_ID;
const CLIENT_EMAIL = process.env.IAP_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.IAP_PRIVATE_KEY?.replace(/\\n/g, "\n"); // 改行が含まれている場合の処理
const IAP_CLIENT_ID = process.env.IAP_CLIENT_ID;
const TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";

// biome-ignore lint/style/useConst:
let cachedToken: string | null = null;
// biome-ignore lint/style/useConst:
let tokenExpiryTime: number | null = null;

export const getIapToken = async () => {
  if (!PRIVATE_KEY_ID || !CLIENT_EMAIL || !PRIVATE_KEY || !IAP_CLIENT_ID) {
    throw new Error("Missing required environment variables");
  }

  const now = Math.floor(Date.now() / 1000);

  if (cachedToken && tokenExpiryTime && now < tokenExpiryTime) {
    return cachedToken;
  }

  const issuedAt = now;
  const expiresAt = issuedAt + 3600; // 1時間後

  const payload = {
    iss: CLIENT_EMAIL,
    sub: CLIENT_EMAIL,
    aud: TOKEN_URL,
    exp: expiresAt,
    iat: issuedAt,
    target_audience: IAP_CLIENT_ID,
  };

  const token = jwt.sign(payload, PRIVATE_KEY, {
    algorithm: "RS256",
    keyid: PRIVATE_KEY_ID,
  });

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: token,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.statusText}`);
  }

  const data: { id_token: string } = await response.json();
  return data.id_token;
};
