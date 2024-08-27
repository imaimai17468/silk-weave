import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Detail } from "./_components/detail";
import { Threads } from "./_components/threads";

export const TopContent = (): React.ReactNode => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <Threads />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <Detail />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};