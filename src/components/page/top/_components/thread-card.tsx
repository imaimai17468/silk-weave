import { Badge } from "@/components/ui/badge";

type Props = {
  title: string;
  user: string;
  tags: string[];
  updatedAt: Date;
};

export const ThreadCard = ({ title, user, tags, updatedAt }: Props) => {
  return (
    <button
      type="button"
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent relative"
    >
      <p className="absolute top-2 right-2 text-xs text-muted-foreground">{updatedAt.toLocaleDateString()}</p>
      <div className="flex flex-wrap gap-2">
        <p className="font-bold">{title}</p>
        <p className="line-clamp-2 text-muted-foreground">by {user}</p>
      </div>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </button>
  );
};
