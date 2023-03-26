"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBoxOpen,
  FaSuitcase,
  FaSuitcaseRolling,
  FaUser,
} from "react-icons/fa";
import { MenuItem } from "../../types/MenuItem";
import FancyButton from "../buttons/FancyButton";
interface Props {
  data: MenuItem[];
}
function Navbar({ data }: Props) {
  const [sidebar, setSidebar] = useState(false);
  return (
    <header className="bg-transparent fixed w-full backdrop-blur z-50 flex justify-center shadow-sm bg-white">
      <div className=" max-w-screen-lg flex-1 p-2 flex flex-row justify-between">
        {/* left */}
        <Link
          href={"/"}
          className=" text-zinc-900 flex flex-row items-center gap-2 text-lg lg:text-2xl font-bold"
        >
          {/* <Image
            alt="Eric Kulbiej"
            src="/logo512.png"
            width={20}
            height={20}
          />{" "} */}
          eric kulbiej
        </Link>
        {/* right */}
        <div className=" hidden lg:flex flex-row gap-8">
          {/*  <FancyButton className="text-indigo-50 flex flex-row items-center gap-2 text-md font-bold">
            <Link href="/signin" className="text-lg font-bold">
              Contact 
            </Link>
          </FancyButton> */}
          <span className="flex flex-row items-center gap-8 text-md font-semibold">
            {data.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className=" transition-all hover:text-red-600"
              >
                {item.title}
              </Link>
            ))}
          </span>
        </div>
        <div
          className="flex lg:hidden items-center"
          onClick={() => {
            setSidebar(!sidebar);
          }}
        >
          <div
            className={
              "h-[2px] w-[20px] relative bg-black before:absolute before:h-[2px] before:w-[20px] before:bg-black after:absolute after:h-[2px] after:w-[20px] after:bg-black transition-all  before:translate-y-2 after:-translate-y-2 " +
              (sidebar ? " before:translate-y-0 after:translate-y-0 before:rotate-90 -rotate-45" : "")
            }
          ></div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
