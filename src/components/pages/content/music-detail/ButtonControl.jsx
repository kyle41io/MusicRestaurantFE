"use client";
import { DetailProvider } from "@/store/MusicDetailProvider";

import React, { useContext } from "react";

import useSongControl from "@/hooks/useSongControl";

import { BiSolidRightArrow } from "react-icons/bi";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { MdRepeat, MdRepeatOne } from "react-icons/md";
import { PiShuffleAngularBold } from "react-icons/pi";

export default function ButtonControl() {
  const {
    isPlaying,
    setIsPlaying,
    isRepeat,
    setIsRepeat,
    isShuffle,
    setIsShuffle,
  } = useContext(DetailProvider);
  const { handlePlayNext, handlePlayPrev } = useSongControl();

  const handleClick = () => {
    if (!isRepeat && !isShuffle) {
      setIsRepeat(true);
    }

    if (isRepeat) {
      setIsRepeat(false);
      setIsShuffle(true);
    }

    if (isShuffle) {
      setIsShuffle(false);
    }
  };

  return (
    <>
      <FaAngleDoubleLeft
        size={24}
        className="cursor-pointer"
        onClick={handlePlayPrev}
      />
      <div onClick={() => setIsPlaying(!isPlaying)} className="cursor-pointer">
        {isPlaying ? <IoMdPause size={24} /> : <BiSolidRightArrow size={24} />}
      </div>
      <FaAngleDoubleRight
        size={24}
        className="cursor-pointer"
        onClick={handlePlayNext}
      />
      <div className="cursor-pointer" onClick={handleClick}>
        {!isRepeat && !isShuffle ? (
          <MdRepeat size={24} />
        ) : isRepeat && !isShuffle ? (
          <MdRepeatOne size={24} />
        ) : (
          <PiShuffleAngularBold size={24} />
        )}
      </div>
    </>
  );
}
