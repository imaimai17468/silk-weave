import { MarkdownPre } from "@/components/parts/markdown-pre";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDetail } from "@/repositories/detail/get-detail";
import { ExternalLinkIcon } from "lucide-react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type DetailContentProps = {
  threadId: string;
};

export const DetailContent: React.FC<DetailContentProps> = async ({ threadId }) => {
  const detail = await getDetail({ threadId });

  if (!detail) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to fetch threads</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-end flex-wrap">
        <p className="text-xl font-bold">{detail.thread.title}</p>
        <p className="text-sm text-muted-foreground">by {detail.thread.user}</p>
      </div>
      <div className="flex gap-2">
        {detail.thread.tags.map((tag) => (
          <Badge className="h-fit" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
      {detail.contents && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre: MarkdownPre,
          }}
          className="markdown"
        >
          {detail.contents}
        </ReactMarkdown>
      )}
      <div className="flex flex-col gap-2 items-end">
        <p className="text-sm text-muted-foreground">started: {detail.createdAt.toLocaleDateString()}</p>
        <p className="text-sm text-muted-foreground">updated: {detail.updatedAt.toLocaleDateString()}</p>
      </div>
      <Button variant="link" className="w-fit gap-2 flex" asChild>
        <Link href={detail.viewInSlackUrl} target="_blank" rel="noopener noreferrer">
          Slackで見る
          <ExternalLinkIcon className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};
