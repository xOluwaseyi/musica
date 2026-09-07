import React, { useEffect, useContext } from "react";
import MusicScroll from "../components/UI/MusicScroll";
import TopCharts from "../components/TopCharts/TopCharts";
import HomeCover from "../components/Home/HomeCover";
import SongContext from "../context";
import { getNewReleases, getPopular, getPlaylists } from "../lib/gospelData";

const Home = ({ newReleases, popular, playlist }) => {
  const { setNewReleases, setPopular, } = useContext(SongContext);

  useEffect(() => {
    if (newReleases && popular) {
      setNewReleases(newReleases)
      setPopular(popular)
    }
  }, [newReleases, popular]);

  return (
    <section className="pb-[120px]">
      <div className="flex flex-col xl:flex-row justify-between mt-5">
        {/* curated playlist */}
        <HomeCover />

        {/*  top charts */}
        <TopCharts playlist={playlist} />
      </div>

      {/* new releases */}
      <MusicScroll playlist={newReleases} title="New Releases" />

      {/* top songs global */}
      <MusicScroll playlist={popular} title="Popular" />
    </section>
  );
};

export const getServerSideProps = async () => {
  // fetched sequentially (not Promise.all) to avoid bursting the
  // rate-limited, unauthenticated iTunes API on a cold cache
  const newReleases = await getNewReleases();
  const popular = await getPopular();
  const playlist = await getPlaylists();

  return {
    props: { newReleases, popular, playlist },
  };
};

export default Home;
