"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateChannelForm } from "./create-channel-form";
import { useState } from "react";

export const ChannelCreateDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <PlusCircleIcon className="w-4 h-4" />
          Add Channel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Channel</DialogTitle>
          <DialogDescription>監視するチャンネルを追加する</DialogDescription>
        </DialogHeader>
        <CreateChannelForm setDialogOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
