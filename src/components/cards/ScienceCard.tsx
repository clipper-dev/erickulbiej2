import React from "react";
import { FaDotCircle } from "react-icons/fa";

interface Props {
  article: ScienceItem;
}
function ScienceCard({ article }: Props) {
  return (
    <div className="flex flex-col w-full gap-4 shadow-sm bg-white p-4">
      {/* details section */}
      <div className="flex flex-row gap-2 items-center flex-wrap">
        <p className=" h-full text-md lg:text-xl text-black bg-emerald-100 px-3 py-1">
          {article.type}
        </p>
        {"•"}
        <p className="  h-full text-md lg:text-xl text-gray-600">
          {article.date}
        </p>
        {"•"}
        <p className=" h-full text-md lg:text-xl text-gray-600">
          {article.journal}
        </p>
      </div>
      {/* title section */}
      <div className="flex flex-row gap-2">
        <h2 className=" self-start text-xl lg:text-2xl font-bold">
          {article.title}
        </h2>
      </div>
      {/* authors section */}
        <span className="flex flex-wrap">
            {article.authors.map((author, index) => (
                <span key={index} className="inline-block px-2 py-1 bg-gray-100 rounded-lg m-1">
                {author === "Eric Kulbiej" ? <strong>{author}</strong> : author}
              </span>
            ))}
            </span>
      {/* description section */}
      <div className="flex flex-row gap-2">
        {/* max height 300px after that truncate */}
        <p className=" self-start text-md lg:text-xl text-gray-600 max-h-72 line-clamp-5">
          {article.description}
        </p>
      </div>
      {/* link section */}
        <div className="flex flex-row gap-2">
            <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-2 items-center hover:text-emerald-600 hover:bg-emerald-50 px-5 py-2 rounded-md transition-all"
            >
                <FaDotCircle className="text-emerald-600" />
                <p className="text-emerald-600">Read more</p>
            </a>
            </div>
    </div>
  );
}

export default ScienceCard;
