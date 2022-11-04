import React, { useState, useEffect, useRef, createContext } from "react";

// AUDIO DEFAULT CONTEXT VALUE
const SongContext = createContext({
  audio: null,
  audioData: null,
  setAudioData: () => {},
  audioArray: [],
  isPlaying: false,
  setIsPlaying: () => {},
  setAudioArray: () => {},
  prev: () => {},
  next: () => {},
  setAudioIndex: () => {},
  playlistData: null,
  setPlaylistData: () => {},
  volumeBar: 100,
  volumeRef: null,
  setVolumeRef: () => {},
  progressBar: 0,
  progressRef: null,
  setProgress: () => {},
  isShuffle: false,
  setIsShuffle: () => {},
  isLooped: false,
  setIsLooped: () => {},
  likes: [],
  setLikes: () => {},
  collections: [],
  setCollections: () => {},
  addOrRemoveLikes: () => {},
  songLiked: () => {},
  addOrRemoveCollection: () => {},
  collectionAdded: () => {},
  setNewReleases: () => {},
  setPopular: () => {},
  search: null,
  handleSearch: () => {},
  allMusic: [],
  searchArray: [],
});

export const SongContextProvider = ({ children }) => {
  // AUDIO STATES //
  const [audio, setAudio] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [audioArray, setAudioArray] = useState([]);
  const [audioIndex, setAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  // PLAYLIST DATA STATE
  const [playlistData, setPlaylistData] = useState(null);

  // VOLUME STATE
  const [volumeBar, setVolumeBar] = useState(100);

  // SHUFFLE AND LOOP STATE
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  // COLLECTIONS AND LIKES STATE
  const [collections, setCollections] = useState([]);
  const [likes, setLikes] = useState([]);

  // PROGRESS AND VOLUME BAR REFS
  const progressRef = useRef();
  const volumeRef = useRef();

  //AUDIO FUNCTIONS //

  // to fetch audio
  useEffect(() => {
    if (audioArray.length > 0) {
      setAudioData(audioArray[audioIndex]);
    }
  }, [audioArray, audioIndex]);

  // to set audio
  useEffect(() => {
    if (audioData !== null) {
      const { audio } = audioData;

      const song = new Audio(audio);

      const ProgressBarFunc = () => {
        const audioTime = song.currentTime;
        const audioDuration = song.duration;

        setProgressBar(((audioTime * 100) / audioDuration).toFixed(1));
      };

      const AudioEndedFunc = () => {
        setHasEnded(!hasEnded);
      };

      song.addEventListener("timeupdate", ProgressBarFunc);
      song.addEventListener("ended", AudioEndedFunc);

      setAudio(song);
    }
  }, [audioData]);

  // clean up function for when component unmounts/audio changes
  useEffect(() => {
    return () => {
      if (audio !== null) {
        audio.pause();
        setProgressBar(0);
      }
    };
  }, [audio]);

  // when audio has ended, should it play again or go to the next one..
  useEffect(() => {
    if (hasEnded) {
      if (isLooped) {
        audio.currentTime = 0;
        audio.play();
      } else {
        next();
      }
      setHasEnded(false);
    }
  }, [hasEnded]);

  // to play or pause audio
  useEffect(() => {
    if (audio !== null) {
      audio.volume = volumeBar / 100;
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  // to play previous song
  const prev = () => {
    if (isLooped) {
      audio.currentTime = 0;
    } else if (isShuffle) {
      shufflePlaylist();
      return;
    } else {
      if (audioIndex - 1 < 0) {
        setAudioIndex(audioArray.length - 1);
      } else {
        setAudioIndex(audioIndex - 1);
      }
    }
  };

  // to play next song
  const next = () => {
    if (isLooped) {
      audio.currentTime = 0;
      setIsPlaying(true);
      return;
    } else if (isShuffle) {
      shufflePlaylist();
      return;
    } else {
      if (audioIndex < audioArray.length - 1) {
        setAudioIndex(audioIndex + 1);
      } else {
        setAudioIndex(0);
      }
    }
  };

  // to set progress bar on click
  const setProgress = (e) => {
    const width = progressRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  };

  // to set volume bar on click
  const setVolumeRef = (e) => {
    const width = volumeRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;

    audio.volume = (clickX / width) * 1;
    setVolumeBar((clickX / width) * 100);
  };

  // to shufflle song/playlist
  const shufflePlaylist = () => {
    if (audioArray.length === 1) {
      setAudioData(audioArray[0]);
    } else {
      const rand = Math.floor(Math.random() * audioArray.length);
      setAudioData(audioArray[rand]);
    }
  };

  // function to add or remove likes
  const addOrRemoveLikes = (id, chart) => {
    var index = likes.findIndex((like) => like.id == id);
    if (index === -1) {
      setLikes((current) => [...current, chart]);
    } else {
      setLikes((current) => current.filter((like) => like.id !== id));
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

  // function to add to collections or remove from collections
  const addOrRemoveCollection = (id, chart) => {
    const index = collections.findIndex((collection) => collection.id == id);
    if (index === -1) {
      setCollections((current) => [...current, chart]);
    } else {
      setCollections((current) =>
        current.filter((collection) => collection.id !== id)
      );
    }
  };

  // function to check if collection is added or not
  const collectionAdded = (id) => {
    const index = collections.findIndex((collection) => collection.id == id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  };

  // to get previously liked songs/playlist and collections from local storage
  useEffect(() => {
    const storageLikes = JSON.parse(localStorage.getItem("likes"));
    if (storageLikes !== null) {
      setLikes(storageLikes);
    }

    const storageCollections = JSON.parse(localStorage.getItem("collections"));
    if (storageCollections !== null) {
      setCollections(storageCollections);
    }
  }, []);

  // to set liked songs/playlist and collections to local storage
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [likes, collections]);

  //TO PUT ALL NEW RELEASES AND POPULAR SONGS IN AN ARRAY FOR SEARCH
  const [popular, setPopular] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [allMusic, setAllMusic] = useState([]);

  useEffect(() => {
    if (popular.length > 0 && newReleases.length > 0) {
      const newArray = popular.concat(newReleases);
      setAllMusic(newArray);
    }
  }, [popular, newReleases]);

  // SEARCH AND FILTER
  const [search, setSearch] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [focusOn, setFocusOn] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const val = allMusic.filter((music) => {
      return music.artist.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchArray(val);
  };

  // AUDIO CONTEXT VALUE
  const contextValue = {
    audio,
    audioData,
    setAudioData,
    audioArray,
    isPlaying,
    setIsPlaying,
    setAudioArray,
    setAudioIndex,
    prev,
    next,
    playlistData,
    setPlaylistData,
    volumeBar,
    volumeRef,
    setVolumeRef,
    progressBar,
    progressRef,
    setProgress,
    isShuffle,
    setIsShuffle,
    isLooped,
    setIsLooped,
    likes,
    setLikes,
    collections,
    setCollections,
    addOrRemoveLikes,
    addOrRemoveCollection,
    songLiked,
    collectionAdded,
    setNewReleases,
    setPopular,
    search,
    handleSearch,
    allMusic,
    searchArray,
    focusOn,
    setFocusOn,
  };

  return (
    <SongContext.Provider value={contextValue}>{children}</SongContext.Provider>
  );
};

export default SongContext;
