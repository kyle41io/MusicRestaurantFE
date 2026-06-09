"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { IoStatsChartSharp } from "react-icons/io5";
import ToastMessage from "@/components/shared/ToastMessage";
import styles from "@/styles/auth/sign-in/SignIn.module.css";

export default function AlbumItem({ track, index, setIsPlaying, isPlaying }) {

  const [displayToast, setDisplayToast] = useState(false);
  const [displayToast2, setDisplayToast2] = useState(false);
  const [responseData, setResponseData] = useState("ĐÃ chọn nhạc");

  const t = useTranslations("Auth");

  const handlePlayClick = () => {
    setDisplayToast(true);
    setIsPlaying(); // Make sure to pass track information if needed
  };

  return (
    <>
    <div className="">      
      <ToastMessage
        onClose={() => setDisplayToast(false)}
        error={false}
        successMessage={responseData}
        showToast={displayToast}
      />
      <ToastMessage
        onClose={() => setDisplayToast2(false)}
        error={true}
        errorMessage={responseData}
        showToast={displayToast2}
      /></div>
      <div
        className="w-full h-20 flex py-2 px-3 gap-4 items-center hover:bg-secondaryGray cursor-pointer"
        onClick={handlePlayClick}
      >
        <div className="w-[12px]">
          {isPlaying ? (
            <IoStatsChartSharp size={12} className="text-primary text-sm" />
          ) : (
            <p className="text-sm">{index + 1}</p>
          )}
        </div>
        <div
          className="w-[13%] h-[60px] bg-center bg-cover"
          style={{ background: `url(${track.image})` }}
        ></div>
        <div className="w-[73%] flex flex-col gap-1">
          <p className="text-sm  text-thirdBlack capitalize">
            {track.songName}
          </p>
          <p className="text-xs text-primaryGray capitalize">{track.singer}</p>
        </div>
      </div>
    </>
  );
}
