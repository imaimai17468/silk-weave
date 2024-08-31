import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <PlusCircleIcon className="w-4 h-4" />
              Add Channel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Channel</DialogTitle>
              <DialogDescription>
                監視するチャンネルを追加する
              </DialogDescription>
            </DialogHeader>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button>Add</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
