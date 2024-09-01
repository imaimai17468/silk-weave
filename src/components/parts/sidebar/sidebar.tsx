import { Suspense } from "react";
import { ChannelList } from "./_components/channel-list";
import { Spinner } from "../spinner";
import { ChannelCreateDialog } from "./_components/channel-create-dialog";

export const Sidebar = () => {
  return (
    <div className="p-4">
      <div className="border-b-2 border-dashed">
        <p className="text-2xl font-bold">Channels</p>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Spinner />
            </div>
          }
        >
          <ChannelList />
        </Suspense>
        <ChannelCreateDialog />
      </div>
    </div>
  );
};
