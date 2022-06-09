import * as React from "react";

import Navbar from "./layout/Navbar";
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

const Layout = ({ children }: Props) => {
  const [isIconVisible, setIconVisible] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Theme>
      <LayoutContext.Provider value={{ isIconVisible, setIconVisible, isDrawerOpen, setDrawerOpen }}>
        <Navbar />
        <main className="dark:bg-slate-900">{children}</main>
      </LayoutContext.Provider>
    </Theme>
  );
};

export default Layout;
