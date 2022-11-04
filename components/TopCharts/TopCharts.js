import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Heart } from "iconsax-react";
import { useRouter } from "next/router";
import SongContext from "../../context";

const TopCharts = ({ playlist }) => {
  // song context
  const { addOrRemoveLikes, songLiked } = useContext(SongContext);

  // state
  const [playlists, setPlaylists] = useState([]);

  // router
  const router = useRouter();

  // to init playlist to be displayed
  useEffect(() => {
    if (playlist) {
      setPlaylists(playlist);
    }
  }, [playlist]);


  return (
    <aside className="xl:w-[40%]">
      <p className="pl-3 text-3xl font-bold">Top charts</p>

      <div className="xl:w-full xl:h-[415px] overflow-x-scroll xl:overflow-y-scroll xl:whitespace-normal whitespace-nowrap no-scrollbar">
        {/* chart */}
        {playlists.map((chart) => {
          // to get artist name not provided in api used
          const artistName = chart.title.split(" ");
          artistName.pop();
          artistName.join(" ");

          return (
            <div
              key={chart.id}
              className="inline-block mr-5 xl:mr-0 xl:flex justify-between px-5 py-7 xl:py-4 rounded-3xl mt-3 items-center bg-[#1A1E1F] cursor-pointer noSelect"
            >
              <div
                className="flex items-center gap-5"
                onClick={() => {
                  // to redirect to playlist details
                  router.push("/albumdetails/" + chart.id, undefined, {
                    shallow: true,
                  });
                }}
              >
                <div className="flex flex-col gap-5 items-center md:flex-row">
                  {/* playlist image */}
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

                  {/* playlist title and artist name */}
                  <div>
                    <p className="text-lg">{chart.title}</p>
                    <p className="text-gray-500 text-sm py-1">{artistName}</p>
                    <p className="text-sm"> 01:23:45 </p>
                  </div>
                </div>
              </div>

              {/* heart icon */}
              <div
                className="self-start mt-5 xl:mt-0 xl:self-center relative grid place-items-center h-[40px] w-[40px] p-2 rounded-full border-2 border-[#ffffff1c] lg:ml-2"
                onClick={() => {
                  addOrRemoveLikes(chart.id, chart);
                }}
              >
                <Heart
                  size="20"
                  color="#FACD66"
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
