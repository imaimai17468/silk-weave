import { Input } from "@/components/ui/input";
import { ThreadCard } from "./thread-card";

type ThreadListProps = {
  channelId: string;
  onSelect: (threadId: string) => string;
};

export const ThreadList: React.FC<ThreadListProps> = ({ channelId, onSelect }) => {
  // TODO: スレッドを取得する
  console.log("getThreads: ", channelId);

  return (
    <div className="flex flex-col gap-4 py-4">
      <Input placeholder="Search" />
      <div className="flex flex-col gap-4">
        <ThreadCard
          title="〇〇についてスレッド"
          user="いまいまい"
          tags={["hoge", "fuga"]}
          updatedAt={new Date()}
          href={onSelect("test-thread-id-1")}
        />
        <ThreadCard
          title="〇〇についてスレッド"
          user="いまいまい"
          tags={["hoge", "fuga"]}
          updatedAt={new Date()}
          href={onSelect("test-thread-id-2")}
        />
        <ThreadCard
          title="〇〇についてスレッド"
          user="いまいまい"
          tags={["hoge", "fuga"]}
          updatedAt={new Date()}
          href={onSelect("test-thread-id-3")}
        />
      </div>
    </div>
  );
};
