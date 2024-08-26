import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/parts/sidebar";

type Props = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: Props): React.ReactNode => {
  return (
    <div className="h-full px-16 py-8">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
