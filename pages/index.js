import React, { useEffect, useContext } from "react";
import MusicScroll from "../components/UI/MusicScroll";
import TopCharts from "../components/TopCharts/TopCharts";
import HomeCover from "../components/Home/HomeCover";
import SongContext from "../context";

const Home = ({ newReleases, popular, playlist }) => {
  
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
  // new releases
  const res1 = await fetch("https://musica-api.up.railway.app/new");
  const newReleases = await res1.json();

  //   popular
  const res2 = await fetch("https://musica-api.up.railway.app/popular");
  const popular = await res2.json();

  //   playlist
  const res3 = await fetch("https://musica-api.up.railway.app/playlist");
  const playlist = await res3.json();

  return {
    props: { newReleases, popular, playlist },
  };
};

export default Home;
