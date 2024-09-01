import { getChannels } from "@/components/parts/sidebar/_libs/getChannels";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ChannelList = async () => {
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
      {channels.map((channel) => (
        <Button variant="ghost" className="justify-start" key={channel.id}>
          # {channel.name}
        </Button>
      ))}
    </>
  );
};
