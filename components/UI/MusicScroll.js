import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import SongContext from "../../context";

const MusicScroll = ({ playlist, title }) => {
  const { setTrackIndex, setAudioArray, setIsPlaying } = useContext(SongContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (playlist) {
      setSongs(playlist);
    }
  }, [playlist]);

  return (
    <section className="mt-12 w-full">
      <p className="text-3xl font-bold mb-5">{title} </p>
      <div className="overflow-x-scroll no-scrollbar whitespace-nowrap">
        {songs.map((song, index) => {
          return (
            <div
              key={song.id}
              onClick={() => {
                setTrackIndex(index)
                setAudioArray(songs)
                setIsPlaying(true)
              }}
              className="inline-block w-[185px] first:ml-0 mx-2 cursor-pointer "
            >
              <div className="relative h-[180px] w-[180px] overflow-hidden rounded-3xl mb-2">
                <Image
                  src={song.cover}
                  alt={song.title}
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </div>
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
