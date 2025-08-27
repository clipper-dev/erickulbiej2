/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { PiArrowRightBold } from "react-icons/pi";

export default function Hero() {
  return (
    <div className="w-full flex flex-col items-center" id="projects">
      <div className="w-full max-w-screen-lg flex flex-col gap-4">
        <section className="grid grid-cols-3 gap-4 p-4">
          <div className="col-span-2">
            
            <h1 className="font-semibold text-4xl lg:text-8xl my-4">
              I build <span className="text-blue-600">wonderful</span> solutions
            </h1>
            <span className="font-medium text-zinc-600 text-sm  lg:text-lg max-w-[50ch]">
              From seafarer to software developer, I craft efficient solutions
              for the maritime industry&apos;s unique needs.
            </span>
            {/* icons for social media */}
            <div className="flex flex-row gap-8 text-3xl my-8">
              <a href="https://x.com/Erickulbiej">
                <FaTwitter className="text-zinc-600 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out" />
              </a>
              <a href="https://github.com/clipper-dev">
                <FaGithub className="text-zinc-600 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out" />
              </a>
              <a href="www.linkedin.com/in/erickulbiej">
                <FaLinkedin className="text-zinc-600 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out"/>
              </a>
              <a href="https://www.instagram.com/coderburg">
                <FaInstagram className="text-zinc-600 cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out" />
              </a>
            </div>
            <Link
              href="/contact"
              className="bg-blue-500 w-fit h-fit text-white font-medium py-4 px-6 rounded-lg border-black border-2 flex flex-row items-center justify-center ek-border-black transition-all duration-300
              hover:-translate-x-[1%] hover:-translate-y-[1%] mx-auto md:mx-0"
            >
              Contact <PiArrowRightBold className="text-white" />
            </Link>
          </div>
          <div className="col-span-1">
            <div className="">
              <img
                src="/res/eric.jpg"
                alt="eric kulbiej profile picture"
                className="image-class border-[3px] border-black min-h-[auto] md:min-h-[475px] rotate-3 hover:rotate-0 hover:-translate-x-[1%] hover:-translate-y-[1%] transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
