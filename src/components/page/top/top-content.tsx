import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import { Threads } from "./_components/threads";
import { Results } from "./_components/results";

export const TopContent = (): React.ReactNode => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <Threads />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <Results />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
