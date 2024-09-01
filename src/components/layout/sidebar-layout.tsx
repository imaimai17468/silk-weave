import { Sidebar } from "@/components/parts/sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

type Props = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: Props): React.ReactNode => {
  return (
    <div className="h-full px-16 py-8">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80} minSize={50}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
