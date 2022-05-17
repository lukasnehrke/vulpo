import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import Footer from "../components/Footer";
import CategoryList from "../components/learn/categories";
import SEO from "../components/seo";

// prettier-ignore
export const posts = [
  {
    title: "Karel und Java installieren",
    description: "Wie installiere ich Karel von fredoverflow? Wenn du Probleme beim Installieren hast, schau dir diesen Guide an!",
    url: "https://marble.one/@ifschleife/karel-und-java-installieren-3771",
  },
  {
    title: "Schleifen in Karel",
    description: "Hier lernst du wie die repeat-Schleife und die while-Schleife in Karel richtig angewendet werden.",
    url: "https://marble.one/@ifschleife/schleifen-in-karel-2312",
  },
];

const IndexPage = () => (
  <>
    <SEO title="Startseite" />
    <div className="bg-[url('../images/waves.svg')] md:px-8 h-[550px]">
      <div className="flex items-center justify-between max-w-screen-2xl h-full mx-auto text-white p-4">
        <div className="py-8 pr-4">
          <span className="uppercase text-sm text-amber-500 font-medium">Bildung wird digital</span>
          <p className="text-3xl">Wir machen Lernen einfach.</p>
          <p className="my-4">
            Mit unseren Lernhilfen steht deinem Lernerfolg nichts mehr im Weg.
            <br />
            Werde jetzt kostenlos Mitglied.
          </p>
          <Link to="/de">
            <button className="rounded px-3 py-2 bg-orange-500 text-sm uppercase">Lexikon ansehen</button>
          </Link>
        </div>
        <StaticImage
          className="hidden lg:block"
          src="../images/study.svg"
          width={510}
          height={400}
          quality={95}
          formats={["auto", "webp", "avif"]}
          placeholder="none"
          alt="Graduation Cap"
        />
      </div>
    </div>

    <div className="flex items-center justify-center h-16 bg-gray-100 dark:bg-gray-800" />

    <section className="mt-6 py-4">
      <div className="text-center">
        <p className="text-sky-600 text-sm font-medium uppercase mb-1">Kostenlose Lerninhalte</p>
        <h2 className="text-3xl dark:text-slate-300">Freie Artikel, Übungen und Videos.</h2>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <CategoryList />
      </div>
    </section>

    <section className="py-4">
      <div className="text-center">
        <p className="text-sky-600 text-sm font-medium uppercase mb-1">News und Guides</p>
        <h2 className="text-3xl dark:text-slate-300">Neues im Blog.</h2>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex items-stretch justify-center flex-wrap my-4 px-4">
          {posts.map((post) => (
            <li key={`post-${post.url}`} className="overflow-x-hidden">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <div className="max-w-[380px] rounded-lg overflow-hidden h-80 m-2 shadow-md dark:bg-slate-800">
                  <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-48" />
                  <div className="p-4">
                    <p className="text-slate-800 dark:text-slate-300 text-xl mb-2">{post.title}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{post.description}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <Footer />
  </>
);

export default IndexPage;
