"use client";
import Image from "next/image";

import { DetailProvider } from "@/store/MusicDetailProvider";

import { useContext} from "react";

import useSongControl from "@/hooks/useSongControl";

import SongControl from "./SongControl";

import avatar from "@/assets/images/song_detail_avatar.png";

const MAX = 100;

export default function MusicPlayer() {
  const { songProgressValue, progressBarRef } = useContext(DetailProvider);
  const { onSongProgressChange } = useSongControl();

  const getBackgroundSize = () => {
    return { backgroundSize: `${(songProgressValue * 100) / MAX}% 100%` };
  };

  return (
    <div className="w-full flex-col h-[180px] bg-primaryBlack">
      <section className="flex p-5 justify-between">
        <div className="flex rounded gap-6">
          <Image
            src={avatar.src}
            width={98}
            height={98}
            alt="Song image"
            className="rounded"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-normal text-white capitalize">
              Nàng thơ
            </h2>
            <h4 className="text-xs font-normal text-white capitalize">
              Hoàng Dũng
            </h4>
          </div>
        </div>

        <p className="w-[93px] h-[22px] rounded-xl bg-primaryGray flex justify-center items-center text-white text-xs">
          # Pop Ballad
        </p>
      </section>

      {/* Song progress */}
      <div className="-mt-5 mb-1">
        <input
          ref={progressBarRef}
          type="range"
          className="music_player"
          value={songProgressValue}
          onChange={onSongProgressChange}
          style={getBackgroundSize()}
        />
      </div>

      <SongControl />
    </div>
  );
}
