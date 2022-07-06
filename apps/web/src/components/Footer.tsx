import { ChevronRightIcon } from "@heroicons/react/solid";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import logo from "../images/logo.svg";
import Link from "./link";

const tiles = [
  ["Open Source", "Die Lernplattform und alle Lerninhalte sind quelloffen und frei lizenziert."],
  ["Modern", "Die neusten Web-Technologien ermöglichen den maximalen Lernkomfort."],
  ["Kein Tracking", "Wir verwenden nur essentielle Cookies und sammeln keine persönliche Daten."],
  ["Keine Werbung", "Unsere Lerninhalte sind stets kostenlos und ohne störende Werbung."],
];

const groups = [
  {
    header: "Einstieg",
    links: [
      { name: "Lernübersicht", href: false },
      { name: "Blog", href: false },
    ],
  },
  {
    header: "Themengebiete",
    links: [
      { name: "Mathematik", href: "/de/mathematik" },
      { name: "Informatik", href: "/de/informatik" },
    ],
  },
  {
    header: "Support",
    links: [
      { name: "Kontakt", href: false },
      { name: "Problem melden", href: false },
    ],
  },
  {
    header: "Rechtliches",
    links: [
      { name: "Impressum", href: "https://docs.vulpo.org/legal/imprint" },
      { name: "Datenschutz", href: "https://docs.vulpo.org/legal/privacy" },
    ],
  },
];

const Footer = () => {
  const mit = (
    <Link href="https://github.com/lukasnehrke/vulpo/blob/main/LICENSE" blank>
      MIT Lizenz
    </Link>
  );
  const github = (
    <Link to="https://github.com/lukasnehrke/vulpo" blank>
      lukasnehrke/vulpo
    </Link>
  );

  return (
    <>
      <div className="px-4 py-4 bg-[#0d1f39]">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-xl mx-auto py-4">
          <div className="hidden lg:flex items-center">
            <StaticImage
              src="../images/brazuca.png"
              width={365}
              quality={95}
              formats={["auto", "webp", "avif"]}
              placeholder="none"
              alt="Footer Hero Image"
              aria-hidden="true"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 text-white">
            {tiles.map((tile) => (
              <div key={`tile-${tile[0]}`} className="max-w-sm m-2">
                <div className="flex items-center text-[#4791db]">
                  <ChevronRightIcon className="w-4 h-4 ml-[-3px]" />
                  <span className="uppercase text-sm font-medium">{tile[0]}</span>
                </div>
                <p className="text-sm dark:text-slate-400">{tile[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto py-8 px-4">
        <section className="max-w-lg text-sm text-slate-800 dark:text-slate-300">
          <img className="w-8 h-8 mb-1" src={logo} alt="Logo" />
          <p className="font-medium">Freie Bildung</p>
          <p>
            Vulpo ist freie Software und steht unter der {mit}. Der Quellcode ist auf GitHub unter {github} verfügbar.
          </p>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Vulpo Contributors
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groups.map((group) => (
            <section key={`group-${group.header}`}>
              <p className="text-sm font-medium mb-1 truncate dark:text-slate-400">{group.header}</p>
              <ul>
                {group.links.map((link) => (
                  <li key={link.name} className="text-sm text-slate-700 dark:text-slate-300 truncate">
                    {link.href ? <Link to={link.href}>{link.name}</Link> : link.name}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default Footer;
