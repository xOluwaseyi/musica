import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MusicaLogoSvg from "../../../public/MusicaLogoSvg";
import { HiMenuAlt4 } from "react-icons/hi";

// nav list
import {NavLink} from "./NavLink"

const MobileNav = () => {
  // router
  const router = useRouter();

  // wheter to show nav or not's state and function
  const [navState, setNavState] = useState(false);
  const showNav = () => {
    setNavState(!navState);
  };

  return (
    <div className="md:hidden ">
      <div className="w-[95vw] mx-auto overflow-hidden flex items-center justify-between pl-8 pr-5 pt-7 ">
        {/* home icon */}
        <Link href="/">
          <a className="">
            <MusicaLogoSvg />
          </a>
        </Link>

        {/* hamburger to open nav */}
        <span
          className="text-3xl font-bold cursor-pointer noSelect"
          onClick={showNav}
        >
          <HiMenuAlt4 />
        </span>
      </div>

      {/* nav */}
      <nav
        className={`fixed top-0 flex flex-col h-screen pt-28 bg-[#1A1E1F] gap-12 duration-1000 pl-10 z-[100]  w-full ${
          navState ? "left-[0px]" : "left-[-100vw]"
        }  md:hidden`}
      >
        {/* to close nav */}
        <div
          className="absolute right-10 top-10 z-[120] text-lg font-[900] cursor-pointer noSelect"
          onClick={showNav}
        >
          X
        </div>

        {/* nav links */}
        {NavLink.map((link) => {
          return (
            <Link key={link.id} href={link.path}>
              <a
                onClick={showNav}
                className={`${
                  router.pathname === link.path
                    ? "text-[#FACD66] opacity-100"
                    : "text-[#EFEEE0] opacity-25"
                } flex items-center gap-7 navlink-animation`}
              >
                {link.icon} <span className="text-xl"> {link.text}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNav;
