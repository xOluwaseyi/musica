import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { PlayCircle } from "iconsax-react";
import SongContext from "../../context";
import { useRouter } from "next/router";

const Collections = () => {
  const [active, setActive] = useState(0);
  const [showCollections, setShowCollections] = useState(true);

  const router = useRouter()

  const { likes, collections, setAudioData, setAudioArray, setTrackIndex, setIsPlaying } =
    useContext(SongContext);

  return (
    <section>
      {/* buttons */}
      <div className="flex w-full mt-10 md:mt-5">
        <button
          className={`${
            showCollections
              ? "bg-[#FACD66] w-[50%] md:w-auto px-4 py-2 rounded-full text-black font-bold"
              : "w-[50%] md:w-auto py-2 px-6 mx-5 border-2 border-[#EFEEE0] opacity-50 rounded-full text-[#EFEEE0]"
          } `}
          type="button"
          onClick={() => {
            setShowCollections(true);
          }}
        >
          My Collection
        </button>
        <button
          className={`${
            !showCollections
              ? "bg-[#FACD66] w-[50%] md:w-auto px-4 py-2 rounded-full text-black font-bold"
              : "w-[50%] md:w-auto py-2 px-6 ml-5 border-2 border-[#EFEEE0] opacity-50 rounded-full text-[#EFEEE0]"
          } `}
          type="button"
          onClick={() => {
            setShowCollections(false);
          }}
        >
          Likes
        </button>
      </div>

      {/* collections */}
      {showCollections && (
        <div className="mt-5 flex gap-8 flex-wrap">
          {collections.map((list) => {
            return (
              <div
                key={list.id}
                className="relative h-[250px] w-full md:w-[250px] rounded-2xl overflow-hidden cursor-pointer"
                onMouseOver={() => {
                  setActive(list);
                }}
                onMouseOut={() => {
                  setActive(0);
                }}
                onClick={() => {
                  router.push("/albumdetails/" + list.id, undefined, {shallow: true});
                }}
              >
                <div className="relative h-[250px] w-full md:w-[250px] bg-black opacity-25 ">
                  <Image
                    src={list.cover}
                    alt={list.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="hidden md:block absolute bottom-5 left-5 w-[85%]">
                  <p className="text-3xl">{list.title}</p>
                  <p className="text-sm">{list.artist}</p>
                  <div
                    className={`flex justify-between items-center w-full mt-5 ${
                      list === active ? "block" : "hidden"
                    }`}
                  >
                    <p>2.3m likes</p>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setTrackIndex(0);
                        setAudioArray(list.files);
                        setIsPlaying(true);
                      }}
                    >
                      <PlayCircle size="26" color="#facd66" variant="Bold" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* likes */}
      {!showCollections && (
        <div className="mt-5 flex gap-8 flex-wrap">
          {likes.map((like) => {
            return (
              <div
                key={like.id}
                className="relative h-[250px] w-full md:w-[250px] rounded-2xl overflow-hidden "
                onMouseOver={() => {
                  setActive(like);
                }}
                onMouseOut={() => {
                  setActive(0);
                }}
              >
                <div className="relative h-[250px] w-full md:w-[250px] bg-black opacity-25">
                  <Image
                    src={like.cover}
                    alt={like.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="absolute bottom-5 left-5 w-[85%]">
                  <p className="text-3xl">{like.title}</p>
                  <p className="text-sm">{like.artist}</p>
                  <div
                    className={`flex justify-between items-center w-full mt-5 ${
                      like === active ? "block" : "hidden"
                    }`}
                  >
                    <p>2.3m likes</p>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        if (like.files) {
                          setTrackIndex(0);
                          setAudioArray(like.files);
                          setIsPlaying(true);
                        } else {
                          setAudioData(like)
                          setIsPlaying(true);

                        }

                      }}
                    >
                      <PlayCircle size="26" color="#facd66" variant="Bold" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Collections;
