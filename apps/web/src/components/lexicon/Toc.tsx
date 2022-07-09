import * as React from "react";

interface Item {
  text: string;
  url: string;
  children?: Item[];
}

const TocItem = ({ item }: { item: Item }) => {
  const scrollTo = () => {
    const el = document.getElementById(item.url.substring(1));
    if (el) {
      window.history.replaceState({}, "", item.url);
      window.scrollTo({ top: el.offsetTop - 62, behavior: "smooth" });
    }
  };
  return (
    <li>
      <button onClick={scrollTo}>{item.text}</button>
      {item.children && <TocList list={item.children} />}
    </li>
  );
};

const TocList = ({ list }: { list: Item[] }) => (
  <ul>
    {list.map((item) => (
      <TocItem key={item.url} item={item} />
    ))}
  </ul>
);

interface Props {
  toc?: Item[];
}

const Toc = ({ toc }: Props) => {
  if (!toc || toc.length === 0) return null;
  return (
    <div className="sticky top-20 mx-auto border-l-[3px] border-theme text-slate-800">
      <TocList list={toc} />
    </div>
  );
};

export default Toc;
