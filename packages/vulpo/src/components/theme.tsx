import { Menu, Transition } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import React from "react";

const ThemeContext = React.createContext({
  scheme: "system",
  setScheme: (scheme: string) => {},
});

export const useTheme = () => {
  return React.useContext(ThemeContext);
};

const Icon = () => {
  const { scheme, setScheme } = useTheme();
  const cssItem = "group flex rounded-md items-center w-full px-2 py-2 my-px text-sm";
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-theme dark:text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <MoonIcon className="w-5 h-5 hidden dark:block" />
        <SunIcon className="w-5 h-5 dark:hidden" />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item onClick={() => setScheme("light")}>
              {({ active }) => (
                <button className={clsx({ "bg-theme text-white": scheme === "light" || active }, cssItem)}>
                  <SunIcon className="w-5 h-5 mr-2" />
                  Hell
                </button>
              )}
            </Menu.Item>
            <Menu.Item onClick={() => setScheme("dark")}>
              {({ active }) => (
                <button className={clsx({ "bg-theme text-white": scheme === "dark" || active }, cssItem)}>
                  <MoonIcon className="w-5 h-5 mr-2" />
                  Dunkel
                </button>
              )}
            </Menu.Item>
            <Menu.Item onClick={() => setScheme("system")}>
              {({ active }) => (
                <button className={clsx({ "bg-theme text-white": scheme === "system" || active }, cssItem)}>
                  <AdjustmentsIcon className="w-5 h-5 mr-2" />
                  System
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

interface ThemeProps {
  children: React.ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  const [scheme, setScheme] = React.useState("system");

  React.useEffect(() => {
    const isDarkPreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = scheme === "dark" || (scheme !== "dark" && isDarkPreferred);
    if (isDark) {
      document.documentElement.classList.add("dark");
      return;
    }
    document.documentElement.classList.remove("dark");
  }, [scheme]);

  React.useEffect(() => {
    if (localStorage) {
      const val = localStorage.getItem("scheme");
      if (val) {
        setScheme(val === "dark" ? val : "light");
        return;
      }
    }
  }, []);

  const updateScheme = (scheme: string) => {
    setScheme(scheme);
    if (localStorage) {
      if (scheme === "system") {
        localStorage.removeItem("scheme");
      } else {
        localStorage.setItem("scheme", scheme === "dark" ? scheme : "light");
      }
    }
  };

  return <ThemeContext.Provider value={{ scheme, setScheme: updateScheme }}>{children}</ThemeContext.Provider>;
};

export default Object.assign(Theme, { Icon });
