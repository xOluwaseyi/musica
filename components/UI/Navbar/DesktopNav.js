import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MusicaLogoSvg from "../../../public/MusicaLogoSvg";
import { MdHomeFilled } from "react-icons/md";
import {
  MusicLibrary2,
  Radio,
  VideoHorizontal,
  Profile,
  LogoutCurve,
} from "iconsax-react";

const DesktopNav = () => {
  // router
  const router = useRouter();

  return (
    <div className="hidden md:col-span-1 sticky top-0 h-screen pt-5 md:flex flex-col items-center gap-[45px]">
      {/* home icon */}
      <Link href="/">
        <a className="transition ease-in-out duration-300 hover:scale-125">
          <MusicaLogoSvg />
        </a>
      </Link>

      {/* first part of nav */}
      <nav className="flex flex-col gap-7 items-center justify-center bg-[#1A1E1F] py-6 px-3 rounded-full">
        {/* home */}
        <Link href="/">
          <a
            className={`${
              router.pathname === "/"
                ? "text-[#FACD66] opacity-100"
                : "text-[#EFEEE0] opacity-25"
            } navlink-animation`}
          >
            <MdHomeFilled className="h-[32px] w-[32px]" />
          </a>
        </Link>

        {/* collections */}
        <Link href="/collections">
          <a
            className={`${
              router.pathname === "/collections"
                ? "text-[#FACD66] opacity-100"
                : "text-[#EFEEE0] opacity-25"
            }  navlink-animation`}
          >
            <MusicLibrary2 size="32" variant="Bold" />
          </a>
        </Link>

        {/* radio */}
        <Link href="/radio">
          <a className="text-[#EFEEE0] opacity-25 navlink-animation">
            <Radio size="32" variant="Bold" />
          </a>
        </Link>

        {/* video */}
        <Link href="/musicvideos">
          <a className="text-[#EFEEE0] opacity-25 navlink-animation">
            <VideoHorizontal size="32" variant="Bold" />
          </a>
        </Link>
      </nav>

      {/* second part of nav */}
      <nav className="flex flex-col gap-7 bg-[#1A1E1F] py-6 px-3 rounded-full">
        {/* profile */}
        <Link href="/profile">
          <a className="text-[#EFEEE0] opacity-25 navlink-animation">
            <Profile size="32" variant="Bold" />
          </a>
        </Link>

        {/* logout */}
        <Link href="/logout">
          <a className="text-[#EFEEE0] opacity-25 navlink-animation">
            <LogoutCurve size="32" variant="Bold" />
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default DesktopNav;
