import Link from "next/link";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { PiArrowRightBold } from "react-icons/pi";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="min-h-[600px] bg-black-light pt-24 flex">
      <div className="max-w-screen-lg mx-4 md:mx-auto flex flex-col  text-white flex-grow">
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-8 text-lg col-span-2 md:col-span-1 mb-8">
            <span className="font-semibold text-5xl md:text-6xl">
              Got a project? Let&apos;s talk
            </span>
            <Link
              href="/contact"
              className="bg-blue-500 w-fit h-fit text-white font-medium py-4 px-6 rounded-lg border-white border-2 flex flex-row items-center justify-center ek-border-white transition-all duration-300
              hover:-translate-x-[1%] hover:-translate-y-[1%] mx-auto md:mx-0"
            >
              Contact <PiArrowRightBold className="text-white" />
            </Link>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col gap-8 text-white text-lg my-auto mx-auto">
            <Link href="/projects" className="hover:text-blue-500 ">
              Projects
            </Link>
            <Link href="/writing" className="hover:text-blue-500 ">
              Writing
            </Link>
            <Link href="/about" className="hover:text-blue-500 ">
              About me
            </Link>
            <Link href="/contact" className="hover:text-blue-500 ">
              Contact
            </Link>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-row gap-8 text-3xl my-8 mx-auto ">
          <a href="https://x.com/Erickulbiej">
            <FaTwitter className="cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out" />
          </a>
          <a href="https://github.com/clipper-dev">
            <FaGithub className="cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out" />
          </a>
          <a href="www.linkedin.com/in/erickulbiej">
            <FaLinkedin className="cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out" />
          </a>
          <a href="https://www.instagram.com/coderburg">
            <FaInstagram className="cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out" />
          </a>
        </div>

        <div className="col-span-2 text-center flex flex-col gap-4 mt-auto text-zinc-400 font-medium text-sm md:text-base">
          <span className="">Copyright Eric Kulbiej, {currentYear}</span>
          <span className="">Made with ❤ in Szczecin, PL</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
