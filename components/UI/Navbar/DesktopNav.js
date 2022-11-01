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
  const router = useRouter();

  return (
    <div className="hidden md:col-span-1 sticky top-0 h-screen pt-5 md:flex flex-col items-center gap-[45px]">
      {/* logo */}
      <Link href="/">
        <a className="transition ease-in-out duration-300 hover:scale-125">
          <MusicaLogoSvg />
        </a>
      </Link>

      <nav className="flex flex-col gap-7 items-center justify-center bg-[#1A1E1F] py-6 px-3 rounded-full">
        <Link href="/">
          <a
            className={`${
              router.pathname === "/"
                ? "text-[#FACD66] opacity-100"
                : "text-[#EFEEE0] opacity-25"
            }  hover:text-[#FACD66] hover:opacity-100 transition ease-in-out duration-100 hover:scale-100`}
          >
            <MdHomeFilled className="h-[32px] w-[32px]" />
          </a>
        </Link>

        <Link href="/collections">
          <a
            className={`${
              router.pathname === "/collections"
                ? "text-[#FACD66] opacity-100"
                : "text-[#EFEEE0] opacity-25"
            }  hover:text-[#FACD66] hover:opacity-100 transition ease-in-out duration-100 hover:scale-100`}
          >
            <MusicLibrary2 size="32" variant="Bold" />
          </a>
        </Link>

        <Link href="/">
          <a className="text-[#EFEEE0] opacity-25 hover:text-[#FACD66] hover:opacity-100 transition ease-in-out duration-100 hover:scale-100">
            <Radio size="32" variant="Bold" />
          </a>
        </Link>

        <Link href="/">
          <a className="text-[#EFEEE0] opacity-25 hover:text-[#FACD66] hover:opacity-100 transition ease-in-out duration-100 hover:scale-100">
            <VideoHorizontal size="32" variant="Bold" />
          </a>
        </Link>
      </nav>

      <nav className="flex flex-col gap-7 bg-[#1A1E1F] py-6 px-3 rounded-full">
        <Link href="/">
          <a className="text-[#EFEEE0] opacity-25 hover:text-[#FACD66] hover:opacity-100 transition ease-in-out duration-100 hover:scale-100">
            <Profile size="32" variant="Bold" />
          </a>
        </Link>

        <Link href="/">
          <a className="text-[#EFEEE0] opacity-25 hover:text-[#FACD66] hover:opacity-100 transition ease-in-out duration-100 hover:scale-100">
            <LogoutCurve size="32" variant="Bold" />
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default DesktopNav;
