import React, { useContext } from "react";
import Image from "next/image";
import SongContext from "../../context";
import { CloseCircle } from "iconsax-react";

const SearchResult = () => {
  // song context
  const { searchArray, setFocusOn, setAudioData, setIsPlaying } =
    useContext(SongContext);

  return (
    <div className="hidden md:block absolute bg-[#1A1E1F] z-50 w-full tb-10 pb-20">
      <p
        onClick={() => {
          setFocusOn(false);
        }}
        className="pr-10 flex justify-end cursor-pointer noSelect"
      >
        {/* to close search result */}
        <CloseCircle size="32" color="#fff" />
      </p>
      
      {/* no search result */}
      {searchArray.length <= 0 && (
        <p className="text-center">No result found</p>
      )}

      {/* search result */}
      <div className="w-full mt-5 flex justify-evenly gap-y-5 flex-wrap">
        {searchArray.map((song) => {
          return (
            <div
              key={song.id}
              onClick={() => {
                setAudioData(song);
                setIsPlaying(true);
                setFocusOn(false);
              }}
              className="w-[185px] first:ml-0 mx-2 cursor-pointer noSelect "
            >
              {/* song image */}
              <div className="relative h-[180px] w-[180px] overflow-hidden rounded-3xl mb-2">
                <Image
                  src={song.cover}
                  alt={song.title}
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </div>

              {/* song description */}
              <p className="text-lg truncate ...">{song.title}</p>
              <p className="text-gray-400 truncate ...">{song.artist}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
