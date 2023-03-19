import Image from "next/image";
import Link from "next/link";
import React from "react";
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
  return (
    <header className="bg-transparent fixed w-full backdrop-blur z-50">
      <div className="py-2 px-4 flex flex-row justify-between">
        {/* left */}
        <Link
          href={"/"}
          className=" text-zinc-900 flex flex-row items-center gap-2 text-2xl font-bold"
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
        <div className="flex flex-row gap-4">
          {/*  <FancyButton className="text-indigo-50 flex flex-row items-center gap-2 text-md font-bold">
            <Link href="/signin" className="text-lg font-bold">
              Contact 
            </Link>
          </FancyButton> */}
          <span className="flex flex-row items-center gap-4 text-md font-semibold">
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
      </div>
    </header>
  );
}

export default Navbar;
