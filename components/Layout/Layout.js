import React from "react";
import SongPlayer from "../SongPlayer/SongPlayer";
import Navbar from "../UI/Navbar//Navbar";
import Search from "../UI/Search";

const Layout = ({ children }) => {
  return (
    <section className="grid grid-cols-12">
      {/* navbar */}
      <Navbar />

      {/* content */}
      <div className="col-span-12 md:col-span-11 w-[95%] md:w-full mx-auto md:pr-8">
        {/* search bar */}
        <Search />

        {/* main content */}
        {children}
      </div>

      {/* song player */}
      <SongPlayer />
    </section>
  );
};

export default Layout;
