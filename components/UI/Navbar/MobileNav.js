import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MusicaLogoSvg from "../../../public/MusicaLogoSvg";
import { HiMenuAlt4 } from "react-icons/hi";
import { NavLink } from "../../../data/NavLink";

const MobileNav = () => {
  const router = useRouter();

  const [navState, setNavState] = useState(false);
  const showNav = () => {
    setNavState(!navState);
  };

  return (
    <div className="md:hidden ">
      {/* <div>  */}
        <div className="w-[95vw] mx-auto overflow-hidden flex items-center justify-between px-10 pt-7 ">
          {/* logo */}
          <Link href="/">
            <a className="transition ease-in-out duration-300 hover:scale-125">
              <MusicaLogoSvg />
            </a>
          </Link>

          <span className="text-3xl font-bold cursor-pointer" onClick={showNav}>
            <HiMenuAlt4 />
          </span>
        </div>
      {/* </div> */}

      <nav
        className={`fixed top-0 flex flex-col h-screen pt-28 bg-[#1A1E1F] gap-12 duration-1000 pl-20 z-[100]  w-full ${
          navState ? "left-[0px]" : "left-[-100vw]"
        }  md:hidden`}
      >
        <div
          className="absolute right-10 top-10 z-[120] font-bold cursor-pointer"
          onClick={showNav}
        >
          X
        </div>

        {NavLink.map((link) => {
          return (
            <Link key={link.id} href={link.path}>
              <a
                onClick={showNav}
                className={`${
                  router.pathname === link.path
                    ? "text-[#FACD66] opacity-100"
                    : "text-[#EFEEE0] opacity-25"
                } flex items-center gap-7 hover:text-[#FACD66] hover:opacity-100 transition ease-in-out duration-100 hover:scale-100`}
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
