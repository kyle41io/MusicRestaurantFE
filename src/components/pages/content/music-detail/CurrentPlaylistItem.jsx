"use client";
import Image from "next/image";

import { IoStatsChartSharp } from "react-icons/io5";

import buiAnhTuan from "@/assets/images/BuiAnhTuan.png";

export default function CurrentPlaylistItem() {

  return (
    <>
      {/* body item */}
      <div className="flex gap-4 h-[86px] justify-between items-center bg-white py-3 px-3 hover:bg-[#f6f6f6] cursor-pointer">
        <div className="flex gap-4">
          <Image
            src={buiAnhTuan.src}
            width={103}
            height={70}
            alt="Bui anh tuan"
          />
          <div className="flex flex-col gap-4">
            <p className="text-lg text-thirdBlack">Nơi tình yêu bắt đầu</p>
            <p className="text-xs text-primaryGray">Bùi Anh Tuấn</p>
          </div>
        </div>
        <IoStatsChartSharp size={12} className="text-primary" />
      </div>
    </>
  );
}
