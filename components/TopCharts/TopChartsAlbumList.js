import React, { useState, useEffect, useContext } from "react";
import SongContext from "../../context";
import Image from "next/image";
import { Heart } from "iconsax-react";
import MoreIconSvg from "../../public/icons/MoreIconSvg";

const TopChartsAlbumList = ({ playlistArray }) => {
  // state
  const [chartDataList, setChartDataList] = useState([]);

  // song context
  const {
    songLiked,
    addOrRemoveLikes,
    setAudioIndex,
    setAudioArray,
    setIsPlaying,
  } = useContext(SongContext);

  // to init playlist list to be displayed
  useEffect(() => {
    if (playlistArray.length > 0) {
      setChartDataList(playlistArray);
    }
  }, [playlistArray]);

  return (
    <div className="mt-10 flex flex-col gap-5">
      {/*on desktop mode*/}
      {chartDataList.map((song, index) => {
        return (
          <div
            key={song.id}
            className="hidden md:flex bg-[#33373beb] rounded-2xl w-full justify-between items-center py-4 px-7 cursor-pointer noSelect"
          >
            {/* heart icon */}
            <div
              onClick={() => {
                addOrRemoveLikes(song.id, song);
              }}
            >
              <Heart
                size="25"
                color="#FACD66"
                variant={songLiked(song.id) ? "Bold" : "Outline"}
              />
            </div>

            {/* div to play song when clicked */}
            <div
              className="flex justify-between items-center w-[93%]"
              onClick={() => {
                setAudioIndex(index);
                setAudioArray(chartDataList);
                setIsPlaying(true);
              }}
            >
              {/* song image */}
              {song.cover && (
                <div className="relative h-[70px] w-[70px] overflow-hidden rounded-lg">
                  <Image
                    src={song.cover}
                    alt={song.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
              {/* song title, artist and duration */}
              <p className="w-[40%]">
                {song.title} ~ {song.artist}
              </p>
              <p className="text-gray-400">Single</p>
              <p>{song.duration}</p>
              <MoreIconSvg styling="h-[30px] w-[30px]" />
            </div>
          </div>
        );
      })}

      {/* on mobile */}
      {chartDataList.map((song, index) => {
        {
          /* div to play song when clicked */
        }
        return (
          <div
            key={song.id}
            className="md:hidden bg-[#33373beb] rounded-2xl w-full flex justify-between items-center py-4 px-5 cursor-pointer noSelect"
            onClick={() => {
              setAudioIndex(index);
              setAudioArray(chartDataList);
              setIsPlaying(true)
            }}
          >
            <div className="flex items-center gap-5">
              <div>
                {/*song image */}
                {song.cover && (
                  <div className="relative h-[60px] w-[60px] md:h-[70px] md:w-[70px] overflow-hidden rounded-lg">
                    <Image
                      src={song.cover}
                      alt={song.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p>
                  {song.title} ~ {song.artist}
                </p>
                <p className="text-gray-400">Single</p>
              </div>
            </div>

            {/* more icon */}
            <div className="flex flex-col gap-2 items-center text-sm">
              <MoreIconSvg styling="h-[25px] w-[25px]" />
              <p>{song.duration}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopChartsAlbumList;
