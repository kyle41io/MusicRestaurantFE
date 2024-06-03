"use client";
import Image from "next/image";

import { DetailProvider } from "@/store/MusicDetailProvider";

import { useContext, useEffect, useRef, useState } from "react";

import useSongControl from "@/hooks/useSongControl";

import { tracks } from "@/constants/songs(test)";

import { formatTime } from "@/utils";

import CurrentPlaylistItem from "../pages/content/music-detail/CurrentPlaylistItem";
import VolumeControl from "../pages/content/music-detail/VolumeControl";
import ButtonControl from "../pages/content/music-detail/ButtonControl";

import { MdPlaylistPlay } from "react-icons/md";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

import avatar from "@/assets/images/avatar.png";

export default function Footer() {
  const {
    userData,
    audioRef,
    volumeBarRef,
    timeProgress,
    setTimeProgress,
    isLiked,
    setIsLiked,
    songProgressValue,
    setSongProgressValue,
    songVolume,
    setSongVolume,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    isRepeat,
    setIsPlaying,
    isShuffle,
    setTrack,
  } = useContext(DetailProvider);

  const volumeContainerRef = useRef(null);

  const { onSongProgressChange } = useSongControl();

  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const MAX = 100;
  const getBackgroundSize = () => {
    return { backgroundSize: `${(songProgressValue * 100) / MAX}% 100%` };
  };

  const getVolumeBackgroundSize = () => {
    return { backgroundSize: `${(songVolume * 100) / MAX}% 100%` };
  };

  const onTimeUpdate = () => {
    if (audioRef.current?.duration) {
      const progress = Math.floor(
        (audioRef.current?.currentTime / audioRef.current?.duration) * 100
      );
      setSongProgressValue(progress);
    }
  };

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying, audioRef]);

  // Update time progress and song progress

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => {
        setTimeProgress(formatTime(audio.currentTime));
        let newProgress;
        if (audio.currentTime / audio.duration) {
          newProgress = (audio.currentTime / audio.duration) * 100;
        }
        setSongProgressValue(newProgress);
      };
      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [audioRef, audioRef.current?.currentTime]);

  // Control what to do when the song ends

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTrackEnded = () => {
        if (isRepeat) {
          audio.currentTime = 0;
        } else if (isShuffle) {
          let randomIndex = Math.floor(Math.random() * (tracks.length + 1));
          setCurrentIndex(randomIndex);
          setTrack(tracks[randomIndex]);
          audio.src = tracks[randomIndex].path;
        } else {
          const nextIndex = (currentIndex + 1) % tracks.length;
          setCurrentIndex(nextIndex);
          setTrack(tracks[nextIndex]);
          audio.src = tracks[nextIndex].path;
        }
        setIsPlaying(true);
        audio.play();
      };
      audio.addEventListener("ended", handleTrackEnded);

      return () => audio.removeEventListener("ended", handleTrackEnded);
    }
  }, [isRepeat, currentIndex, audioRef.current]);

  // Control volume 

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = songVolume / 100;
    }
  }, [songVolume, audioRef.current]);

  return (
    <>
      {userData ? (
        <section className="fixed bottom-0 flex justify-center w-full bg-thirdGray items-center z-50">
          <div className="h-[72px] 2xl:w-[1400px] xl:w-[1200px] lg:w-[1000px] md:w-[750px] sm:w-[600px] w-[350px] justify-between flex gap-6 items-center">
            <ButtonControl />
            <div className="w-[42%] flex items-center gap-3">
              <p className="text-sm text-primary w-[32px]">{timeProgress}</p>
              <audio
                ref={audioRef}
                className="hidden"
                onTimeUpdate={() => onTimeUpdate()}
              >
                <source src={tracks[currentIndex].path} type="audio/mpeg" />
              </audio>
              <input
                type="range"
                value={songProgressValue}
                className="footer_progress"
                style={getBackgroundSize()}
                max={MAX}
                onChange={onSongProgressChange}
              />
              <p className="text-sm w-[32px]">
                {audioRef.current?.duration
                  ? formatTime(audioRef.current.duration)
                  : "--:--"}
              </p>
            </div>

            <div
              ref={volumeContainerRef}
              className="relative group"
              onMouseOver={() => setShowVolumeBar(true)}
              onMouseLeave={() => setShowVolumeBar(false)}
            >
              <VolumeControl />

              {showVolumeBar && (
                <div
                  ref={volumeBarRef}
                  className="absolute flex items-center justify-center w-[40px] h-[153px] top-0 left-0 border rounded bg-thirdGray -translate-y-[116%] -translate-x-2 "
                >
                  <input
                    value={songVolume}
                    type="range"
                    style={getVolumeBackgroundSize()}
                    className="footer-volume"
                    onChange={(e) => setSongVolume(Number(e.target.value))}
                  />
                </div>
              )}
            </div>
            {/* Information */}
            <div className="w-[35,7%] h-full flex items-center border-l gap-4 border-l-secondaryGray relative">
              <Image
                src={avatar.src}
                width={46}
                height={46}
                alt="avatar"
                className="rounded-full ml-6"
              />

              {/* Song info */}
              <div className="flex flex-col h-full mt-3">
                <p className="text-xs text-primaryGray mb-1">N B D</p>
                <h5 className="text-sm text-thirdBlack uppercase">
                  Mặt mộc | Phạm Nguyên Ngọc x Vanh x Ân Nhi{" "}
                </h5>
              </div>

              {/* Like */}
              <div onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? (
                  <BsHeartFill
                    size={24}
                    className="text-2xl cursor-pointer text-primary"
                  />
                ) : (
                  <BsHeart size={24} className="text-2xl cursor-pointer" />
                )}
              </div>

              {/* Current Playlist */}
              {showPlaylist && (
                <div className="absolute flex flex-col w-[470px] h-[500px] top-0 -translate-y-[100%] overflow-y-auto right-0 translate-x-[11%] border border-secondaryGray z-10">
                  {/* header */}
                  <div className="flex justify-between bg-white border-b border-secondaryGray p-3">
                    <p className="text-sm text-thirdBlack">Tracks</p>
                    <div
                      className="text-thirdBlack cursor-pointer"
                      onClick={() => setShowPlaylist(false)}
                    >
                      <IoMdClose size={24} />
                    </div>
                  </div>
                  <CurrentPlaylistItem />
                  <CurrentPlaylistItem />
                  <CurrentPlaylistItem />
                  <CurrentPlaylistItem />
                  <CurrentPlaylistItem />
                  <CurrentPlaylistItem />
                  <CurrentPlaylistItem />
                </div>
              )}
            </div>
            <MdPlaylistPlay
              size={24}
              className={`${
                showPlaylist ? "text-primary" : ""
              } text-2xl cursor-pointer`}
              onClick={() => setShowPlaylist(!showPlaylist)}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
