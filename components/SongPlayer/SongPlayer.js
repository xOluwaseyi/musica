import React, { useState, useEffect, useContext } from "react";
import { VolumeHigh } from "iconsax-react";
import Image from "next/image";
import SongContext from "../../context";
import SongPlayerFunction from "./SongPlayerFunctions";

const SongPlayer = () => {
  const { audioData, volumeBar, volumeRef, setVolumeRef } =
    useContext(SongContext);

  const [currentSong, setCurrentSong] = useState({});

  useEffect(() => {
    if (audioData !== null) {
      setCurrentSong(audioData);
    }
  }, [audioData]);

  const { cover, title, artist } = currentSong;

  return (
    <section className="fixed left-0 bottom-0 h-[120px] w-full py-5 pr-5 gap-3 overflow-hidden flex justify-around items-center bg-[#1e1e1e] bg-opacity-95">
      {/* song image, title and artist */}
      {audioData !== null && (
        <div className=" flex items-center gap-5">
          {/* song image */}
          {cover && (
            <div className="relative rounded-lg overflow-hidden h-[70px] w-[70px] lg:h-[85px] lg:w-[85px]">
              <Image
                src={cover}
                alt={title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
          {/* song title and artist */}
          <div className="text-sm md:text-lg">
            <p className="font-bold ">{title}</p>
            <p className="text-[#ffffff70]">{artist}</p>
          </div>
        </div>
      )}

      {/* song player */}
      <div className={`${audioData !== null ? "w-[25%]" : "w-[90%]"} md:w-[35%] flex flex-col items-center`}>
        {audioData !== null ? <SongPlayerFunction /> : "No song played"}
      </div>

      {/* volume */}
      {audioData !== null && (
        <div className="hidden md:w-[20%] md:flex items-center gap-3">
          <VolumeHigh size="22" color="#ffffff" variant="Bold" />
          <div
            className="hidden md:block bg-[#fff] rounded-lg cursor-pointer my-[10px] h-[4px] w-full"
            ref={volumeRef}
            onClick={setVolumeRef}
          >
            <div
              className={`bg-orange-300 rounded-lg h-full`}
              style={{ width: `${volumeBar}%` }}
            ></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SongPlayer;
