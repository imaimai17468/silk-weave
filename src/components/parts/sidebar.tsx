import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="p-4">
      <div className="border-b-2 border-dashed">
        <p className="text-2xl font-bold">Channels</p>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <Button variant="ghost" className="justify-start">
          # aaa
        </Button>
        <Button variant="ghost" className="justify-start">
          # aaaccc
        </Button>
        <Button variant="ghost" className="justify-start">
          # aaabb
        </Button>
        <Button variant="outline" className="flex gap-2">
          <PlusCircleIcon className="w-4 h-4" />
          Add Channel
        </Button>
      </div>
    </div>
  );
};
