import React, { useContext } from "react";

import { DetailProvider } from "@/store/MusicDetailProvider";

export default function useVolumeControl() {
  const { songVolume, setSongVolume, audioRef } = useContext(DetailProvider);

  const handleControlVolume = () => {
    if (songVolume !== 0 && audioRef.current) {
      setSongVolume(0);
    }
    if (songVolume === 0 && audioRef.current) {
      setSongVolume(50);
    }
  };

  return { handleControlVolume };
}
