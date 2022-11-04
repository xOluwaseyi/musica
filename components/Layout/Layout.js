import React, {useContext} from "react";
import SearchResult from "../SearchResult";
import SongPlayer from "../SongPlayer/SongPlayer";
import Navbar from "../UI/Navbar//Navbar";
import Search from "../UI/Search";
import SongContext from "../../context";

const Layout = ({ children }) => {
  const {search, focusOn} = useContext(SongContext)
  return (
    <section className="grid grid-cols-12">
      {/* navbar */}
      <Navbar />

      {/* content */}
      <div className="relative col-span-12 md:col-span-11 w-[95%] md:w-full mx-auto md:pr-8">
        {/* search bar */}
        <Search />
        {search !== "" && focusOn && <SearchResult />}

        {/* main content */}
        {children}
      </div>

      {/* song player */}
      <SongPlayer />
    </section>
  );
};

export default Layout;
