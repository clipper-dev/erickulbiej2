import React from "react";
interface Props {
  tag: string;
}
function Tag({ tag }: Props) {
  return (
    <div
      id={tag + "-" + Math.random() * 1000}
      className="cursor-pointer py-1 px-3 bg-neutral-100 text-neutral-500 border border-neutral-100 shadow-sm rounded-md w-fit whitespace-nowrap hover:bg-indigo-100 hover:shadow-md hover:shadow-indigo-100 hover:border-indigo-100 transition-all"
    >
      {tag}
    </div>
  );
}

export default Tag;
