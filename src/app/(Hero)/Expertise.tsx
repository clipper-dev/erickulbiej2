/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaCode, FaComputer  } from "react-icons/fa6";
import { RiShipFill } from "react-icons/ri";
import { TbMicroscope } from "react-icons/tb";

export default function Expertise() {
  return (
    <div className="w-full flex flex-col items-center mb-24" id="projects">
      <div className="w-[90%] max-w-screen-lg flex flex-col gap-4 mx-auto">
        <h2 className="font-semibold text-4xl lg:text-6xl mb-8">
          My Expertise
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
          <article className="flex flex-col gap-4">
          <div className="p-4 border-[3px] border-black rounded-lg w-fit h-fit bg-blue-100 ek-border-black hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
              <FaCode className="text-blue-400 text-7xl m-auto" />
            </div>
            <h2 className="font-semibold text-xl lg:text-2xl">Development</h2>
            <ul className="text-zinc-700 font-semibold md:font-medium text-sm lg:text-lg space-y-3">
              <li>HTML, CSS, JS, C#</li>
              <li>React and NextJS</li>
              <li>Full stack and serverless</li>
              <li>Modern and responsive</li>
            </ul>
          </article>
          <article className="flex flex-col gap-4">
          <div className="p-4 border-[3px] border-black rounded-lg w-fit h-fit bg-blue-100 ek-border-black hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
              <FaComputer className="text-blue-400 text-7xl m-auto" />
            </div>
            <h2 className="font-semibold text-xl lg:text-2xl">
              Custom Solutions
            </h2>
            <ul className="text-zinc-700 font-semibold md:font-medium text-sm lg:text-lg space-y-3">
              <li>Web & App Design</li>
              <li>Scalable systems</li>
              <li>API integrations</li>
              <li>Databases</li>
            </ul>
          </article>
          <article className="flex flex-col gap-4">
          <div className="p-4 border-[3px] border-black rounded-lg w-fit h-fit bg-blue-100 ek-border-black hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
              <TbMicroscope className="text-blue-400 text-7xl m-auto" />
            </div>
            <h2 className="font-semibold text-xl lg:text-2xl">Research</h2>
            <ul className="text-zinc-700 font-semibold md:font-medium text-sm lg:text-lg space-y-3">
              <li>Academic approach</li>
              <li>Prototyping and testing</li>
              <li>Simulation and modeling</li>
              <li>Data-driven insights</li>
            </ul>
          </article>
          <article className="flex flex-col gap-4">
          <div className="p-4 border-[3px] border-black rounded-lg w-fit h-fit bg-blue-100 ek-border-black hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
              <RiShipFill className="text-blue-400 text-7xl m-auto" />
            </div>
            <h2 className="font-semibold text-xl lg:text-2xl">Maritime</h2>
            <ul className="text-zinc-700 font-semibold md:font-medium text-sm lg:text-lg space-y-3">
              <li>Project management</li>
              <li>Safety at sea</li>
              <li>Planned maintenance</li>
              <li>Audits and inspections</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}
