import { PageProps } from "gatsby";
import * as React from "react";

import Navbar from "./layout/Navbar";
import PageLayout from "./lexicon/page/Layout";
import Theme from "./theme";

interface ILayoutContext {
  isIconVisible: boolean;
  isDrawerOpen: boolean;
  setIconVisible: (visible: boolean) => void;
  setDrawerOpen: (open: boolean) => void;
}

const LayoutContext = React.createContext<ILayoutContext>({
  isIconVisible: false,
  isDrawerOpen: false,
  setIconVisible: () => {},
  setDrawerOpen: () => {},
});

export const useLayout = () => {
  return React.useContext(LayoutContext);
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ data, pageContext, children }: Omit<PageProps<any, any>, "children"> & Props) => {
  const [isIconVisible, setIconVisible] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  let getLayout = (page: React.ReactNode) => page;

  if (pageContext.isPage) {
    getLayout = (children: React.ReactNode) => <PageLayout page={data.lexiconArticle}>{children}</PageLayout>;
  }

  return (
    <Theme>
      <LayoutContext.Provider value={{ isIconVisible, setIconVisible, isDrawerOpen, setDrawerOpen }}>
        <Navbar />
        <div className="dark:bg-slate-900">{getLayout(children)}</div>
      </LayoutContext.Provider>
    </Theme>
  );
};

export default Layout;
