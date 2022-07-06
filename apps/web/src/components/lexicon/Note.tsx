import clsx from "clsx";
import * as React from "react";

interface Props {
  type?: string;
  children: React.ReactNode;
}

const Note = (props: Props) => {
  const type = props.type || "info";
  const children = React.Children.toArray(props.children);

  const wrapper = {
    "border-[#448aff]": type === "info",
    "border-[#ff9100]": type === "warning",
  };

  const title = {
    "bg-[#e5f6fd] text-[#014361]": type === "info",
    "bg-[#fff4e5] text-[#663c00]": type === "warning",
  };

  return (
    <div className={clsx("prose-p:m-0 border-l-4 shadow rounded overflow-hidden dark:bg-slate-800", wrapper)}>
      <div className={clsx("px-4 py-2 font-medium dark:bg-slate-600 dark:text-slate-200", title)}>{children[0]}</div>
      <div className="p-4">{children.shift() && children}</div>
    </div>
  );
};

export default Note;
