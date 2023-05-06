import Image from "next/image";
import React from "react";
import { data as projects } from "../../data/projects";
import Tag from "../crumbs/Tag";
function Projects() {
  return (
    <div className="w-full flex flex-col items-center" id="projects">
      <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2">
        <span className="flex flex-row gap-2">
          <div className=" w-[4px] bg-indigo-600"></div>
          <h2 className=" self-start text-2xl lg:text-4xl font-bold">
            Professional Projects 🔬
          </h2>
        </span>
        {projects.map((item, index) => (
          <div
            key={index}
            className={
              "w-full flex flex-col lg:flex-row gap-4 rounded-lg shadow-lg bg-white " +
              (item.layout === "left" && " lg:flex-row") +
              (item.layout === "right" && " lg:flex-row-reverse")
            }
          >
            <div key={index} className="flex flex-col flex-1 p-4 gap-4">
              <Tag tag={item.tag} />
              <h2 className="font-bold text-3xl lg:text-4xl">{item.name}</h2>
              {item.description.map((text, index) => (
                <p
                  key={index}
                  className="text-neutral-600 text-sm lg:text-base"
                >
                  {text}
                </p>
              ))}
              <div className="flex flex-row gap-4 items-center">
                {item.technologies.map((tech, index)=>(
                  <div key={index} className="">
                    <Image src={tech.image} alt={tech.fullName} width={40} height={40} style={{objectFit:"contain"}}/>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex-1 w-full min-h-[300px]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
