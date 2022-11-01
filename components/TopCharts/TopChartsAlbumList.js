import React, { useState, useEffect, useContext } from "react";
import SongContext from "../../context";
import Image from "next/image";
import { Heart } from "iconsax-react";
import MoreIconSvg from "../../public/icons/MoreIconSvg";

const TopChartsAlbumList = ({ playlistArray }) => {
  const [chartDataList, setChartDataList] = useState([]);

  const { likes, setLikes, setTrackIndex, setAudioArray, setIsPlaying } =
    useContext(SongContext);

  useEffect(() => {
    if (playlistArray.length > 0) {
      setChartDataList(playlistArray);
    }
  }, [playlistArray]);

  // function to check likes

  const songLiked = (id) => {
    const index = likes.findIndex((like) => like.id == id);
    if (index === -1) {
      return false
    } else {
      return true
    }
  };

  // function to add to likes
  const addToLikes = (id, song) => {
    var index = likes.findIndex((like) => like.id == id);
    if (index === -1) {
      setLikes((current) => [...current, song]);
    } else {
      setLikes((current) => current.filter((like) => like.id !== id));
    }
  };

  return (
    <div className="mt-10 flex flex-col gap-5">
      {/* desktop */}
      {chartDataList.map((song, index) => {
        return (
          <div
            key={song.id}
            className="hidden md:flex bg-[#33373beb] rounded-2xl w-full justify-between items-center py-4 px-7 cursor-pointer"
            onClick={() => {
              setTrackIndex(index);
              setAudioArray(chartDataList);
              setIsPlaying(true);
            }}
          >
            <div className="flex items-center gap-5">
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
              <div
                onClick={() => {
                  addToLikes(song.id, song);
                }}
              >
                <Heart
                  size="25"
                  color="#FACD66"
                  variant={songLiked(song.id) ? "Bold" : "Outline"}
                />
              </div>
            </div>
            <p className="w-[40%]">
              {song.title} ~ {song.artist}
            </p>
            <p className="text-gray-400">Single</p>
            <p>{song.duration}</p>
            <MoreIconSvg styling="h-[30px] w-[30px]" />
          </div>
        );
      })}

      {/* mobile */}
      {chartDataList.map((song, index) => {
        return (
          <div
            key={song.id}
            className="md:hidden bg-[#33373beb] rounded-2xl w-full flex justify-between items-center py-4 px-5 cursor-pointer"
            onClick={() => {
              setTrackIndex(index);
              setAudioArray(chartDataList);
            }}
          >
            <div className="flex items-center gap-5">
              <div>
                {/* image */}
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
