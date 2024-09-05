import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { searchParamsCache, serialize } from "@/utils/searchParams";
import { EyeOff } from "lucide-react";
import { ThreadList } from "./thread-list";

export const Threads = () => {
  const { channelId, threadId } = searchParamsCache.all();
  const setThreadId = (id: string) => {
    return serialize("/", { channelId, threadId: id });
  };

  return (
    <div className="p-4">
      <div className="border-b-2 border-dashed">
        <p className="text-2xl font-bold">Threads</p>
      </div>
      {channelId ? (
        <ThreadList channelId={channelId} threadId={threadId} onSelect={setThreadId} />
      ) : (
        <div className="py-4">
          <Alert>
            <EyeOff className="w-4 h-4" />
            <AlertTitle>No Threads</AlertTitle>
            <AlertDescription>Please select a channel</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};
