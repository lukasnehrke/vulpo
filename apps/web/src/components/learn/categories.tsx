import { Link } from "gatsby";
import * as React from "react";

import BiologyIcon from "../icons/Biology";
import ChemistryIcon from "../icons/Chemistry";
import ComputerScienceIcon from "../icons/ComputerScience";
import EconomicsIcon from "../icons/Economics";
import GeographyIcon from "../icons/Geography";
import HistoryIcon from "../icons/History";
import LiteratureIcon from "../icons/Literature";
import MathsIcon from "../icons/Maths";
import MedicineIcon from "../icons/Medicine";
import MusicIcon from "../icons/Music";
import PhysicsIcon from "../icons/Physics";
import PoliticsIcon from "../icons/Politics";

const categories = [
  { id: "maths", image: MathsIcon, slug: "mathematik", title: "Mathematik", enabled: true },
  { id: "informatics", image: ComputerScienceIcon, slug: "informatik", title: "Informatik", enabled: true },
  { id: "biology", image: BiologyIcon, slug: "biologie", title: "Biologie" },
  { id: "chemistry", image: ChemistryIcon, slug: "chemie", title: "Chemie" },
  { id: "physics", image: PhysicsIcon, slug: "physik", title: "Physik" },
  { id: "economics", image: EconomicsIcon, slug: "wirtschaft", title: "Wirtschaft" },
  { id: "geography", image: GeographyIcon, slug: "geographie", title: "Geographie" },
  { id: "history", image: HistoryIcon, slug: "geschichte", title: "Geschichte" },
  { id: "literature", image: LiteratureIcon, slug: "literatur", title: "Literatur" },
  { id: "music", image: MusicIcon, slug: "musik", title: "Musik" },
  { id: "politics", image: PoliticsIcon, slug: "politik", title: "Politik" },
  { id: "medicine", image: MedicineIcon, slug: "medizin", title: "Medizin" },
];

const CategoryList = () => (
  <ul className="flex flex-wrap justify-center mx-auto mt-8 text-slate-700 dark:text-slate-300">
    {categories.map((category) => (
      <li key={`lexicon-${category.id}`} className="p-1 w-[50%] sm:w-[33.333%] lg:w-[16.6666666667%]">
        {category.enabled ? (
          <Link className="flex flex-col items-center" to={`de/${category.slug}`}>
            {category.image && React.createElement(category.image, { className: "w-12 h-12" })}
            <span className="mt-1">
              {category.title} {!category.enabled && "(bald)"}
            </span>
          </Link>
        ) : (
          <div className="flex flex-col items-center cursor-not-allowed">
            {category.image && React.createElement(category.image, { className: "w-12 h-12" })}
            <span className="mt-1">
              {category.title} {!category.enabled && "(bald)"}
            </span>
          </div>
        )}
      </li>
    ))}
  </ul>
);

export default CategoryList;
