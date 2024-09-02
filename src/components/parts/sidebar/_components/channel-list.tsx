import { getChannels } from "@/components/parts/sidebar/_libs/get-channels";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { searchParamsCache, serialize } from "@/utils/searchParams";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const ChannelList = async () => {
  const { channelId, threadId } = searchParamsCache.all();
  const setChannelId = (id: string) => {
    return serialize("/", { channelId: id, threadId });
  };

  const channels = await getChannels();

  if (!channels) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to fetch channels</AlertDescription>
      </Alert>
    );
  }

  if (channels.length === 0) {
    return (
      <Alert>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>No channels</AlertTitle>
        <AlertDescription>Add a channel to get started</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {channels.map((channel) => {
        return (
          <Button
            variant={channelId === channel.id ? "default" : "ghost"}
            className="justify-start"
            key={channel.id}
            asChild
          >
            <Link href={setChannelId(channel.id)}># {channel.name}</Link>
          </Button>
        );
      })}
    </>
  );
};
