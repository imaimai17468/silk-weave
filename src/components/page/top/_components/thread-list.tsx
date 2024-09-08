import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { getThreads } from "@/repositories/thread/get-threads";
import { AlertCircle, EyeOff } from "lucide-react";
import { ThreadCard } from "./thread-card";

type ThreadListProps = {
  channelId: string;
  threadId: string | null;
  onSelect: (threadId: string) => string;
};

export const ThreadList: React.FC<ThreadListProps> = async ({ channelId, threadId, onSelect }) => {
  const threads = await getThreads({ channelId });

  if (!threads) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to fetch threads</AlertDescription>
      </Alert>
    );
  }

  if (threads.length === 0) {
    return (
      <Alert>
        <EyeOff className="w-4 h-4" />
        <AlertTitle>No threads</AlertTitle>
        <AlertDescription>Add a thread to get started</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <Input placeholder="Search" />
      <div className="flex flex-col gap-4">
        {threads.map((thread) => (
          <ThreadCard
            key={thread.id}
            title={thread.title}
            user={thread.user}
            tags={thread.tags}
            updatedAt={thread.updatedAt}
            href={onSelect(thread.id)}
            isSelected={threadId === thread.id}
          />
        ))}
      </div>
    </div>
  );
};
