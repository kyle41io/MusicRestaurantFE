"use client";

import { createContext, useRef, useState } from "react";

import { tracks } from "@/constants/songs(test)";

export const DetailProvider = createContext();

export default function MusicDetailProvider({ children }) {
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [track, setTrack] = useState(tracks[currentIndex]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [songProgressValue, setSongProgressValue] = useState(0);
  const [timeProgress, setTimeProgress] = useState("--:--");
  const [showVolume, setShowVolume] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [songVolume, setSongVolume] = useState(50);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userData, setUserData] = useState("");

  return (
    <DetailProvider.Provider
      value={{
        inputRef,
        audioRef,
        progressBarRef,
        volumeBarRef,
        currentIndex,
        setCurrentIndex,
        track,
        setTrack,
        isPlaying,
        setIsPlaying,
        isRepeat,
        setIsRepeat,
        isShuffle,
        setIsShuffle,
        songProgressValue,
        setSongProgressValue,
        timeProgress,
        setTimeProgress,
        showVolume,
        setShowVolume,
        isLiked,
        setIsLiked,
        songVolume,
        setSongVolume,
        showDeleteModal,
        setShowDeleteModal,
        userData,
        setUserData,
      }}
    >
      {children}
    </DetailProvider.Provider>
  );
}
