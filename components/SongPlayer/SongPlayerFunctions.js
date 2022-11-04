import React, { useContext } from "react";
import {
  Shuffle,
  Previous,
  Next,
  PlayCircle,
  PauseCircle,
  RepeateOne,
} from "iconsax-react";
import SongContext from "../../context";

const SongPlayerFunctions = () => {

  // song context
  const {
    isPlaying,
    setIsPlaying,
    prev,
    next,
    progressBar,
    progressRef,
    setProgress,
    isShuffle,
    setIsShuffle,
    isLooped,
    setIsLooped,
  } = useContext(SongContext);

  return (
    <>
      {/* song player functions */}
      <div className="flex items-center gap-3 md:gap-10 ">
        {/* shuffle */}
        <div
          onClick={() => {
            setIsShuffle(!isShuffle);
          }}
          className="cursor-pointer noSelect hidden md:block"
        >
          <Shuffle
            size="22"
            color={isShuffle ? "#FACD66" : "#ffffff"}
            variant={isShuffle ? "Bold" : "Outline"}
          />
        </div>

        {/* previous */}
        <div className="cursor-pointer noSelect" onClick={prev}>
          <Previous size="22" color="#ffffff" variant="Bold" />
        </div>

        {/* play and pause*/}
        {isPlaying ? (
          <div
            className="cursor-pointer noSelect p-3"
            onClick={() => {
              setIsPlaying(false);
            }}
          >
            <PauseCircle size="26" color="#ffffff" variant="Bold" />
          </div>
        ) : (
          <div
            className="cursor-pointer noSelect p-3"
            onClick={() => {
              setIsPlaying(true);
            }}
          >
            <PlayCircle size="26" color="#facd66" variant="Bold" />
          </div>
        )}

        {/* next */}
        <div className="cursor-pointer noSelect" onClick={next}>
          <Next size="22" color="#ffffff" variant="Bold" />
        </div>

        {/* repeat */}
        <div
          className="cursor-pointer noSelect hidden md:block"
          onClick={() => {
            setIsLooped(!isLooped);
          }}
        >
          <RepeateOne
            size="22"
            color={isLooped ? "#FACD66" : "#ffffff"}
            variant={isLooped ? "Bold" : "Outline"}
          />
        </div>
      </div>

      {/* progress */}
      <div
        className="hidden md:block bg-[#fff] rounded-lg cursor-pointer noSelect my-[10px] h-[4px] w-full"
        onClick={setProgress}
        ref={progressRef}
      >
        <div
          className={`bg-orange-300 rounded-lg h-full`}
          style={{ width: `${progressBar}%` }}
        ></div>
      </div>
    </>
  );
};

export default SongPlayerFunctions;
