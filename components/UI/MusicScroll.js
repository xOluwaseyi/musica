import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import SongContext from "../../context";

const MusicScroll = ({ playlist, title }) => {
  // song context
  const { setAudioIndex, setAudioArray, setIsPlaying } =
    useContext(SongContext);

  // state
  const [songs, setSongs] = useState([]);

  // to init songs to be displayed
  useEffect(() => {
    if (playlist) {
      setSongs(playlist);
    }
  }, [playlist]);

  return (
    <section className="mt-12 w-full">
      {/* playlist type/title */}
      <p className="text-3xl font-bold mb-5 pl-2">{title} </p>

      {/* div to be clicked to play song */}
      <div className="overflow-x-scroll no-scrollbar whitespace-nowrap">
        {songs.map((song, index) => {
          return (
            <div
              key={song.id}
              onClick={() => {
                setAudioIndex(index);
                setAudioArray(songs);
                setIsPlaying(true);
              }}
              className="inline-block w-[185px] first:ml-0 mx-2 cursor-pointer noSelect "
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
    </section>
  );
};

export default MusicScroll;
