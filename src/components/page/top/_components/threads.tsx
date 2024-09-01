import { Input } from "@/components/ui/input";
import { ThreadCard } from "./thread-card";

export const Threads = () => {
  return (
    <div className="p-4">
      <div className="border-b-2 border-dashed">
        <p className="text-2xl font-bold">Threads</p>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <Input placeholder="Search" />
        <div className="flex flex-col gap-4">
          <ThreadCard title="〇〇についてスレッド" user="いまいまい" tags={["hoge", "fuga"]} updatedAt={new Date()} />
          <ThreadCard title="〇〇についてスレッド" user="いまいまい" tags={["hoge", "fuga"]} updatedAt={new Date()} />
          <ThreadCard title="〇〇についてスレッド" user="いまいまい" tags={["hoge", "fuga"]} updatedAt={new Date()} />
          <ThreadCard title="〇〇についてスレッド" user="いまいまい" tags={["hoge", "fuga"]} updatedAt={new Date()} />
        </div>
      </div>
    </div>
  );
};
