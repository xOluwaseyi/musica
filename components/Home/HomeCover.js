import React from 'react'
import Image from "next/image";
import usersImage from "../../public/images/users-likes.png";
import Artist from "../../public/images/CoverArtist.png";
import spiralBg from "../../public/spiral-bg.png";
import HeartIcon from "../../public/icons/HeartIcon";

const HomeCover = () => {
  return (
    <>
      <div className="bg-[#609EAF] mb-10 xl:mb-0 h-[450px] w-[95%] mx-auto xl:mx-0 xl:w-[55%] flex justify-around rounded-2xl md:rounded-[50px] overflow-hidden relative ">
        {/* text */}
        <div className="w-[80%] mx-auto md:mx-0 md:w-[35%] flex flex-col justify-evenly ">
          <p className="mb-36 md:mb-0">Curated playlist </p>
          <div>
            <h1 className="text-4xl font-bold  mb-3 ">R & B Hits</h1>
            <p className="w-[85%] md:w-full text-sm md:text-base">
              All mine, Lie again, Petty call me everyday, Out of time, No love,
              Bad habit, and so much more
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Image src={usersImage} alt="users" />
            <HeartIcon styling="fill-white h-[25px] w-[25px] " />
            <span>33k Likes</span>
          </div>
        </div>

        {/* spiral image */}
        <div className="absolute right-[-120px] md:right-0">
          <div className="relative h-[180px] w-[300px] rotate-[17deg] md:rotate-0 scale-x-[-1] md:scale-x-[1] md:h-[500px] md:w-[700px] ">
            <Image
              src={spiralBg}
              alt="main-photo"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>

        {/* artist image */}
        <div className="hidden md:block relative h-full w-[320px]">
          <Image
            src={Artist}
            alt="main-photo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </>
  );
}

export default HomeCover