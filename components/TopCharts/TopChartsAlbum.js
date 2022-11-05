import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import TopChartsAlbumList from "./TopChartsAlbumList";
import { Heart, CloseCircle } from "iconsax-react";
import PlayAllIconSvg from "../../public/icons/PlayAllIconSvg";
import AddCollectionIcon from "../../public/icons/AddCollectionIcon";
import SongContext from "../../context";

const TopChartsAlbum = ({
  playlistData,
  playlistArrayLength,
  playlistArray,
}) => {
  // state
  const [chartData, setChartData] = useState({});
  const [arrayLength, setArrayLength] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // router
  const router = useRouter();

  // songcontext
  const {
    setAudioArray,
    setAudioIndex,
    setIsPlaying,
    songLiked,
    addOrRemoveLikes,
    addOrRemoveCollection,
    collectionAdded,
  } = useContext(SongContext);

  // for adding or removing collection message
  useEffect(() => {
    if (successId !== null) {
      setSuccess(true);
      const result = collectionAdded(successId);

      if (result) {
        setMessage("Playlist added to collections");
      } else {
        setMessage("Playlist removed from collections");
      }
    }

    const timeout = setTimeout(() => {
        setSuccess(false);
    }, [1500]);

    return () => {
      clearTimeout(timeout);
    };
  }, [successId, collectionAdded]);

  // to init data to be displayed
  useEffect(() => {
    if (playlistData !== null) {
      setArrayLength(playlistArrayLength);
      setChartData(playlistData);
    }
  }, [playlistData, playlistArrayLength]);

  return (
    <section className="w-[100%] md:w-full mb-32 mt-10">
      {/* play details background cover */}
      {chartData.cover && (
        <div className="hidden lg:block absolute top-0 left-0 right-0 overflow-hidden -z-50 ">
          <div className="relative w-screen h-screen opacity-5">
            <Image
              src={chartData.cover}
              alt="playlist cover"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      )}

      {/* to close playlist details */}
      <p
        onClick={() => {
          router.back();
        }}
        className="pr-5 md:pr-0 flex justify-end cursor-pointer noSelect"
      >
        <CloseCircle size="32" color="#fff" />
      </p>

      {/* playlist details */}
      <div className="flex flex-col md:items-center md:flex-row relative  gap-8 mt-7">
        {/* playlist details cover */}
        {chartData.cover && (
          <div className="h-[340px] w-auto overflow-hidden rounded-lg">
            {/* success message */}
            {success && (
              <p className="success">
                {message}
              </p>
            )}
            {/* // success message end */}

            <div className=" h-[350px] w-[350px] relative overflow-hidden rounded-lg">
              <Image
                src={chartData.cover}
                alt="playlist-cover"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        )}

        {/* playlist details text */}
        <div className="flex flex-col gap-3 w-full md:w-[50%]">
          <h1 className="text-[#A4C7C6] text-3xl font-bold">
            {chartData.title}
          </h1>
          <p className="md:w-[80%]">{chartData.info}</p>
          {arrayLength !== null && <p> {arrayLength} songs</p>}

          {/* playlist details buttons: play all, add to collection, heart */}
          <div className="flex flex-wrap gap-5 mt-5 ">
            {/* play all */}
            <div
              className="bg-[#ffffff12] rounded-2xl p-3 gap-3 flex items-center cursor-pointer noSelect"
              onClick={() => {
                setAudioIndex(0);
                setAudioArray(chartData.files);
                setIsPlaying(true);
              }}
            >
              <PlayAllIconSvg styling="fill-[#FACD66] h-[25px] w-[25px]" />
              <span>Play all</span>
            </div>

            {/* add to collection */}
            <div
              className="bg-[#ffffff12] rounded-2xl p-3 gap-3 flex items-center cursor-pointer noSelect "
              onClick={() => {
                addOrRemoveCollection(chartData.id, chartData);
                setSuccessId(chartData.id);
              }}
            >
              <AddCollectionIcon styling="fill-[#FACD66] h-[25px] w-[25px]" />
              <span>
                {collectionAdded(chartData.id)
                  ? "Remove from collections"
                  : "Add to collections"}
              </span>
            </div>

            {/* like collection */}
            <div
              className="bg-[#ffffff12] p-3 flex items-center rounded-2xl gap-3 md:rounded-full md:h-[50px] md:w-[50px]  md:grid md:place-items-center cursor-pointer noSelect"
              onClick={() => {
                addOrRemoveLikes(chartData.id, chartData);
              }}
            >
              <Heart
                size="25"
                color="#FACD66"
                variant={songLiked(chartData.id) ? "Bold" : "Outline"}
              />
              <span className="md:hidden">
                {songLiked(chartData.id) ? "Unlike" : "Like"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* playlist details list */}
      <TopChartsAlbumList playlistArray={playlistArray} />
    </section>
  );
};

export default TopChartsAlbum;
