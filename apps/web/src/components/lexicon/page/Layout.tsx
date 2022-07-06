import * as React from "react";

import Banner from "./Banner";
import PageDrawer from "./Drawer";

interface Props {
  page: Queries.LexiconPage;
  fullscreen?: boolean;
  children?: React.ReactNode;
}

const PageLayout = ({ page, fullscreen, children }: Props) => {
  const style = page.color ? { ["--theme-color" as any]: page.color } : {};
  const br = [...(page.lesson!.categories || []), { title: page.lesson!.title, url: page.lesson!.url }];

  return (
    <div id="lexicon-page" className="h-full" style={style}>
      <PageDrawer page={page} />
      <Banner breadcrumbs={br} />
      {children}
    </div>
  );
};

export default PageLayout;
