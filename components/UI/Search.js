import React, { useState, useContext } from "react";
import SongContext from "../../context";

const Search = () => {
  const { search, handleSearch, setFocusOn } = useContext(SongContext);

  return (
    <>
      <form className="hidden md:flex items-center static bg-transparent top-0 h-[75px] z-50">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            onFocus={() => {
              setFocusOn(true);
            }}
            className="bg-transparent outline-none block w-full pl-10 p-2.5  "
            placeholder="Search artists"
            required=""
          />
        </div>
      </form>
    </>
  );
};

export default Search;
