import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import TopChartsAlbumList from "./TopChartsAlbumList";
import { Heart } from "iconsax-react";
import PlayAllIconSvg from "../../public/icons/PlayAllIconSvg";
import AddCollectionIcon from "../../public/icons/AddCollectionIcon";
import SongContext from "../../context";

const TopChartsAlbum = ({
  playlistData,
  playlistArrayLength,
  playlistArray,
}) => {
  const [chartData, setChartData] = useState({});
  const [arrayLength, setArrayLength] = useState(null);
  const [addOrRemove, setAddOrRemove] = useState("");

  const router = useRouter();

  const {
    collections,
    setCollections,
    likes,
    setLikes,
    setAudioArray,
    setTrackIndex,
    setIsPlaying,
  } = useContext(SongContext);

  useEffect(() => {
    if (playlistData !== null) {
      setArrayLength(playlistArrayLength);
      setChartData(playlistData);
    }
  }, [playlistData, playlistArrayLength]);

  useEffect(() => {
    const index = collections.findIndex(
      (collection) => collection.id == chartData.id
    );
    if (index === -1) {
      setAddOrRemove("Add to collections");
    } else {
      setAddOrRemove("Remove from collections");
    }
  }, [collections, chartData.id]);

  // function to add to collection
  const addToCollection = () => {
    const index = collections.findIndex(
      (collection) => collection.id == chartData.id
    );
    if (index === -1) {
      setCollections((current) => [...current, chartData]);
    } else {
      setCollections((current) =>
        current.filter((collection) => collection.id !== chartData.id)
      );
    }
  };

  // function to check likes
  const songLiked = (id) => {
    const index = likes.findIndex((like) => like.id == id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  };

  // function to add to likes
  const addToLikes = () => {
    var index = likes.findIndex((like) => like.id == chartData.id);
    if (index === -1) {
      setLikes((current) => [...current, chartData]);
    } else {
      setLikes((current) => current.filter((like) => like.id !== chartData.id));
    }
  };

  return (
    <section className="w-[100%] md:w-full mb-32 mt-10">
      {/* album details background cover */}
      {chartData.cover && (
        <div className="hidden lg:block absolute top-0 left-0 right-0 overflow-hidden -z-50 ">
          <div className="relative w-screen h-screen opacity-5">
            <Image
              src={chartData.cover}
              alt="bg album cover"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      )}

      <p
        onClick={() => {
          router.back();
        }}
        className="pr-5 md:pr-0 text-end cursor-pointer font-bold text-xl"
      >
        X
      </p>

      {/* album details */}
      <div className="flex flex-col md:items-center md:flex-row relative  gap-8 mt-7 ">
        {/* album details cover */}
        {chartData.cover && (
          <div className="h-[340px] w-auto overflow-hidden rounded-lg">
            <div className=" h-[350px] w-[350px] relative overflow-hidden rounded-lg">
              <Image
                src={chartData.cover}
                alt="album-cover"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        )}

        {/* album details text */}
        <div className="flex flex-col gap-3 w-full md:w-[50%]">
          <h1 className="text-[#A4C7C6] text-3xl font-bold">
            {chartData.title}
          </h1>
          <p className="md:w-[80%]">{chartData.info}</p>
          {arrayLength !== null && <p> {arrayLength} songs</p>}

          {/* album details buttons: play all, add to collection, heart */}
          <div className="flex flex-wrap gap-5 mt-5 ">
            {/* play all */}
            <div
              className="bg-[#ffffff12] rounded-2xl p-3 gap-3 flex items-center cursor-pointer"
              onClick={() => {
                setTrackIndex(0);
                setAudioArray(chartData.files);
                setIsPlaying(true);
              }}
            >
              <PlayAllIconSvg styling="fill-[#FACD66] h-[25px] w-[25px]" />
              <span>Play all</span>
            </div>

            {/* add to collection */}
            <div
              className="bg-[#ffffff12] rounded-2xl p-3 gap-3 flex items-center cursor-pointer "
              onClick={() => {
                addToCollection();
              }}
            >
              <AddCollectionIcon styling="fill-[#FACD66] h-[25px] w-[25px]" />
              <span>{addOrRemove}</span>
            </div>

            {/* like collection */}
            <div
              className="bg-[#ffffff12] p-3 flex items-center rounded-2xl gap-3 md:rounded-full md:h-[50px] md:w-[50px]  md:grid md:place-items-center cursor-pointer"
              onClick={() => {
                addToLikes();
              }}
            >
              <Heart
                size="25"
                color="#ff0000"
                variant={songLiked(chartData.id) ? "Bold" : "Outline"}
              />
              <span className="md:hidden">
                {songLiked(chartData.id) ? "Unlike" : "Like"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* album details list */}
      <TopChartsAlbumList playlistArray={playlistArray} />
    </section>
  );
};

export default TopChartsAlbum;
