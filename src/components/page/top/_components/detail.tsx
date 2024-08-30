import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

export const Detail = () => {
  return (
    <div className="p-4">
      <div className="border-b-2 border-dashed">
        <p className="text-2xl font-bold">Detail</p>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Badge className="h-fit">hoge</Badge>
            <Badge className="h-fit">huge</Badge>
            <Badge className="h-fit">piyo</Badge>
          </div>
          <Button variant="link" className="w-fit gap-2 flex">
            Slackで見る
            <ExternalLinkIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">Conclusion</p>
          <p>ここにAIが考えた結論が入るよ</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">Key Points</p>
          <ul className="list-disc list-inside">
            <li>hoge</li>
            <li>huge</li>
            <li>piyo</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">Description</p>
          <p>
            ここにAIが考えた詳細説明が入るよここにAIが考えた詳細説明が入るよ ここにAIが考えた詳細説明が入るよ
            ここにAIが考えた詳細説明が入るよ ここにAIが考えた詳細説明が入るよ ここにAIが考えた詳細説明が入るよ
            ここにAIが考えた詳細説明が入るよ ここにAIが考えた詳細説明が入るよ ここにAIが考えた詳細説明が入るよ
            ここにAIが考えた詳細説明が入るよ
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">Next Action</p>
          <ul className="list-disc list-inside">
            <li>hoge</li>
            <li>huge</li>
            <li>piyo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
