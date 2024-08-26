import { Badge } from "@/components/ui/badge";

type Props = {
  title: string;
  description: string;
  tags: string[];
  updatedAt: Date;
};

export const ThreadCard = ({ title, description, tags, updatedAt }: Props) => {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent relative">
      <p className="absolute top-2 right-2 text-xs text-muted-foreground">
        {updatedAt.toLocaleDateString()}
      </p>
      <p className="font-bold">{title}</p>
      <p className="line-clamp-2 text-muted-foreground">{description}</p>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
