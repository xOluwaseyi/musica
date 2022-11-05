import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { PlayCircle } from "iconsax-react";
import SongContext from "../../context";

const Collections = () => {
  // router
  const router = useRouter();

  // state
  const [active, setActive] = useState(0);
  const [showCollections, setShowCollections] = useState(true);

  // song context
  const {
    likes,
    collections,
    setAudioData,
    setAudioArray,
    setAudioIndex,
    setIsPlaying,
  } = useContext(SongContext);

  return (
    <section className="mb-32">
      {/* buttons */}
      <div className="flex w-full mt-10 md:mt-5">
        {/* my collection button */}
        <button
          className={`${
            showCollections ? "active-collection-btn" : "collection-btn"
          } mr-2`}
          type="button"
          onClick={() => {
            setShowCollections(true);
          }}
        >
          My Collections
        </button>

        {/* likes button */}
        <button
          className={`${
            !showCollections ? "active-collection-btn" : "collection-btn"
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
          {collections.map((collection) => {
            return (
              <div
                key={collection.id}
                className="collection-list noSelect"
                onMouseOver={() => {
                  setActive(collection);
                }}
                onMouseOut={() => {
                  setActive(0);
                }}
              >
                <div className="relative h-[250px] w-full md:w-[250px] bg-black opacity-25 ">
                  <Image
                    src={collection.cover}
                    alt={collection.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="absolute bottom-5 left-5 w-[85%]">
                  <p className="text-3xl">{collection.title}</p>
                  <p className="text-sm">{collection.artist}</p>
                  <div
                    className={`flex justify-between items-center w-full mt-5 ${
                      collection === active ? "block" : "hidden"
                    }`}
                  >
                    <p>2.3m likes</p>
                    <div
                      className="cursor-pointer noSelect"
                      onClick={() => {
                        router.push(
                          "/albumdetails/" + collection.id,
                          undefined,
                          {
                            shallow: true,
                          }
                        );
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
                className="collection-list noSelect"
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
                      className="cursor-pointer noSelect"
                      onClick={() => {
                        if (like.files) {
                          setAudioIndex(0);
                          setAudioArray(like.files);
                          setIsPlaying(true);
                        } else {
                          setAudioData(like);
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
