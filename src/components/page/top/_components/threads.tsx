import { Spinner } from "@/components/parts/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { searchParamsCache, serialize } from "@/utils/searchParams";
import { EyeOff } from "lucide-react";
import { Suspense } from "react";
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
      <div className="py-4">
        {channelId ? (
          <Suspense
            fallback={
              <div className="flex justify-center">
                <Spinner />
              </div>
            }
          >
            <ThreadList channelId={channelId} threadId={threadId} onSelect={setThreadId} />
          </Suspense>
        ) : (
          <Alert>
            <EyeOff className="w-4 h-4" />
            <AlertTitle>No Threads</AlertTitle>
            <AlertDescription>Please select a channel</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
