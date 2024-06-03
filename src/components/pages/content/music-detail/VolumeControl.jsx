"use client";
import { DetailProvider } from "@/store/MusicDetailProvider";

import React, { useContext } from "react";

import useVolumeControl from "@/hooks/useVolumeControl";

import {
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";

export default function VolumeControl() {
  const { songVolume } = useContext(DetailProvider);
  const { handleControlVolume } = useVolumeControl();

  return (
    <div className="cursor-pointer" onClick={handleControlVolume}>
      {songVolume === 0 ? <IoVolumeMute size={24} /> : null}
      {songVolume > 0 && songVolume <= 25 ? <IoVolumeLow size={24} /> : null}
      {songVolume > 25 && songVolume < 50 ? <IoVolumeMedium size={24} /> : null}
      {songVolume >= 50 ? <IoVolumeHigh size={24} /> : null}
    </div>
  );
}
