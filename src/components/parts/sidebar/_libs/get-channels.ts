import type { Channel } from "@/types/zod";

export const getChannels = async (): Promise<Channel[] | undefined> => {
  try {
    const res = await fetch("http://localhost:3000/api/channel");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();
    return json.channels;
  } catch (error) {
    console.error("Failed to fetch channels:", error);
    return undefined;
  }
};
