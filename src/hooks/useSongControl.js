import { useContext } from "react";

import { tracks } from "@/constants/songs(test)";

import { formatTime } from "@/utils";

import { DetailProvider } from "@/store/MusicDetailProvider";

export default function useSongControl() {
  const {
    currentIndex,
    setCurrentIndex,
    setTrack,
    audioRef,
    setIsPlaying,
    setTimeProgress,
    setSongProgressValue,
  } = useContext(DetailProvider);

  const handlePlayPrev = () => {
    const audio = audioRef.current;
    if (audio) {
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentIndex(prevIndex);
      setTrack(tracks[prevIndex]);
      audio.src = tracks[prevIndex].path;
      setIsPlaying(true);
      audio.play();
    }
  };

  const handlePlayNext = () => {
    const audio = audioRef.current;
    if (audio) {
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentIndex(nextIndex);
      setTrack(tracks[nextIndex]);
      setIsPlaying(true);
      audio.src = tracks[nextIndex].path;
      audio.play();
    }
  };

  const onSongProgressChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (e.target.value / 100) * audio.duration;
      audio.currentTime = newTime;
      setSongProgressValue(e.target.value);
      setTimeProgress(formatTime(newTime));
    }
  };

  return { handlePlayPrev, handlePlayNext, onSongProgressChange };
}
