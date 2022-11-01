import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Heart } from "iconsax-react";
import { useRouter } from "next/router";
import SongContext from "../../context";

const TopCharts = ({ playlist }) => {
  const [playlists, setPlaylists] = useState([]);

  const router = useRouter();

  const { setPlaylistData, likes, setLikes } = useContext(SongContext);

  useEffect(() => {
    if (playlist) {
      setPlaylists(playlist);
    }
  }, [playlist]);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

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
  const addToLikes = (id, chart) => {
    var index = likes.findIndex((like) => like.id == id);
    if (index === -1) {
      setLikes((current) => [...current, chart]);
    } else {
      setLikes((current) => current.filter((like) => like.id !== id));
    }
  };

  return (
    <aside className="xl:w-[40%]">
      <p className="text-3xl font-bold">Top charts</p>

      <div className="xl:w-full xl:h-[415px] overflow-x-scroll xl:overflow-y-scroll xl:whitespace-normal whitespace-nowrap no-scrollbar">
        {/* chart */}
        {playlists.map((chart) => {
          const artistName = chart.title.split(" ");
          artistName.pop();
          artistName.join(" ");

          return (
            <div
              key={chart.id}
              onClick={() => {
                router.push("/albumdetails/" + chart.id, undefined , {shallow: true});
              }}
              className="inline-block mr-5 xl:mr-0 xl:flex justify-between px-5 py-7 xl:py-4 rounded-3xl mt-3 items-center bg-[#1A1E1F] cursor-pointer"
            >
              <div className="flex items-center gap-5 ">
                <div className="flex flex-col gap-5 items-center md:flex-row">
                  <div className="h-[100px] w-auto rounded-xl overflow-hidden">
                    <div className="relative h-[100px] w-[100px] rounded-xl overflow-hidden">
                      <Image
                        src={chart.cover}
                        alt="chart image"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <div className="">
                    <p className="text-lg">{chart.title}</p>
                    <p className="text-gray-500 text-sm py-1">{artistName}</p>
                    <p className="text-sm"> 2:00:00 </p>
                  </div>
                </div>
              </div>

              <div
                className="self-start mt-5 xl:mt-0 xl:self-center relative grid place-items-center h-[40px] w-[40px] p-2 rounded-full border-2 border-[#ffffff1c] lg:ml-2"
                onClick={() => {
                  addToLikes(chart.id, chart);
                }}
              >
                <Heart
                  size="20"
                  color="#ff0000"
                  variant={songLiked(chart.id) ? "Bold" : "Outline"}
                />
              </div>
            </div>
          );
        })}
        {/* chart end */}
      </div>
    </aside>
  );
};

export default TopCharts;
