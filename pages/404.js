import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdHomeFilled } from "react-icons/md";
import { MusicLibrary2 } from "iconsax-react";
import BrokenDisc from "../public/images/broken-disc.png";

const ErrorPage = () => {
  return (
    <div className="h-[80vh] mx-auto w-[90%] md:w-[50%] pt-14 md:pt-24 ">
      <div className="flex flex-col items-center">
        <div className="relative h-[100px] w-[100px] md:h-[150px] md:w-[150px] mb-5 md:mb-7">
          <Image
            src={BrokenDisc}
            alt="Broken disc"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="font-extrabold italic border-4 p-1 text-lg md:text-2xl mb-3 md:mb-5">
          - PAGE NOT AVAILABLE -
        </h1>
        <p className="text-lg md:text-2xl text-center font-medium md-5 md:mb-7">
          This page you are trying to view is either not available at the moment
          or you have input an invallid URL. Where do you want to go from here?
        </p>
        <div className="flex gap-5">
          <Link href="/">
            <a className="flex items-center gap-2 p-3 bg-[#fff] text-black font-bold text-lg">
              <MdHomeFilled className="h-[26px] w-[26px]" /> Home
            </a>
          </Link>
          <Link href="/collections">
            <a className="flex items-center gap-2 p-3 bg-[#fff] text-black font-bold text-lg">
              <MusicLibrary2 size="26" variant="Outline" />
              Collections
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
