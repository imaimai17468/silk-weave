import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { TopContent } from "@/components/page/top/top-content";
import { searchParamsCache } from "@/utils/searchParams";
import type { SearchParams } from "nuqs/parsers";

type PageProps = {
  searchParams: SearchParams;
};

export default async function PaginationDemoPage({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return (
    <SidebarLayout>
      <TopContent />
    </SidebarLayout>
  );
}
