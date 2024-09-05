import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  title: string;
  user: string;
  tags: string[];
  updatedAt: Date;
  href: string;
  isSelected: boolean;
};

export const ThreadCard = ({ title, user, tags, updatedAt, href, isSelected }: Props) => {
  return (
    <Button variant={isSelected ? "default" : "outline"} className="h-auto items-start" asChild>
      <Link href={href} className="flex flex-col relative gap-4">
        <p className="absolute top-2 right-2 text-xs text-muted-foreground">{updatedAt.toLocaleDateString()}</p>
        <div className="flex flex-wrap gap-2">
          <p className="font-bold">{title}</p>
          <p className="line-clamp-2 text-muted-foreground">by {user}</p>
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-muted-foreground border-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
    </Button>
  );
};
