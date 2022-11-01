import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";

const SongContext = createContext({
  audio: null,
  audioData: null,
  setAudioData: () => {},
  audioArray: [],
  isPlaying: false,
  setIsPlaying: () => {},
  setAudioArray: (playlist) => {},
  prev: () => {},
  next: () => {},
  setTrackIndex: () => {},
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
  setCollections: () => {}
});

export const SongContextProvider = ({ children }) => {
  const [audio, setAudio] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [audioArray, setAudioArray] = useState([]);

  const [playlistData, setPlaylistData] = useState(null);

  const [progressBar, setProgressBar] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [volumeBar, setVolumeBar] = useState(100);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  const [collections, setCollections] = useState([])
  const [likes, setLikes] = useState([])

  // to fetch song

  useEffect(() => {
    if (audioArray.length > 0) {
      setAudioData(audioArray[trackIndex]);
    }
  }, [audioArray, trackIndex]);

  // song
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

      // const setAudioVolume = () => setVolumeBar(volumeBar / 100);

      song.addEventListener("timeupdate", ProgressBarFunc);
      song.addEventListener("ended", AudioEndedFunc);
      // song.addEventListener("volumechange", setAudioVolume);

      setAudio(song);
    }
  }, [audioData]);

  // clean up

  useEffect(() => {
    return () => {
      if (audio !== null) {
        audio.pause();
        setProgressBar(0);
      }
    };
  }, [audio]);

  // has ended

  useEffect(() => {
    if (hasEnded) {
      if (isLooped) {
        audio.currentTime = 0;
        audio.play()
      } else {
        next()
      }
      setHasEnded(false)
    }
  }, [hasEnded]);

  // is playing
  useEffect(() => {
    if (audio !== null) {
      audio.volume = volumeBar / 100
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  // prev btn
  const prev = () => {
    if (isLooped) {
      audio.currentTime = 0;
    } else if (isShuffle) {
      shufflePlaylist();
      return;
    } else {
      if (trackIndex - 1 < 0) {
        setTrackIndex(audioArray.length - 1);
      } else {
        setTrackIndex(trackIndex - 1);
      }
    }
  };

  // nextbtn
  const next = () => {
    if (isLooped) {
      audio.currentTime = 0;
      setIsPlaying(true);
      return;
    } else if (isShuffle) {
      shufflePlaylist();
      return;
    } else {
      if (trackIndex < audioArray.length - 1) {
        setTrackIndex(trackIndex + 1);
      } else {
        setTrackIndex(0);
      }
    }
  };

  // progress bar on click
  const progressRef = useRef();

  const setProgress = (e) => {
    const width = progressRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  };

  // volume bar
  const volumeRef = useRef();

  const setVolumeRef = (e) => {
    const width = volumeRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;

    audio.volume = (clickX / width) * 1;
    setVolumeBar((clickX / width) * 100)
  };

  // shuffle
  const shufflePlaylist = () => {
    if (audioArray.length === 1) {
      setAudioData(audioArray[0]);
    } else {
      const rand = Math.floor(Math.random() * audioArray.length);
      setAudioData(audioArray[rand]);
    }
  };

  // context value

  const contextValue = {
    audio,
    audioData,
    setAudioData,
    audioArray,
    isPlaying,
    setIsPlaying,
    setAudioArray,
    setTrackIndex,
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
    setCollections
  };

  return (
    <SongContext.Provider value={contextValue}>{children}</SongContext.Provider>
  );
};

export default SongContext;
