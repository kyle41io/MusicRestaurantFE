"use client";

import { DetailProvider } from "@/store/MusicDetailProvider";

import React, { useContext } from "react";

import { BiSolidRightArrow } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { FaShare, FaTrashAlt } from "react-icons/fa";

export default function ListAction() {
  const { setShowDeleteModal } = useContext(DetailProvider);

  return (
    <section className="w-full flex justify-between">
      <div className="flex gap-4 items-center">
        <p className="text-primaryGray flex items-center gap-1">
          <BiSolidRightArrow size={12} />
          <span className="text-xs">15,570</span>
        </p>

        <p className="text-primaryGray flex items-center gap-1">
          <AiFillHeart size={12} />
          <span className="text-xs">238</span>
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex gap-1 items-center text-xs text-thirdBlack cursor-pointer border border-secondaryGray rounded py-1 px-[10px]">
          <AiFillHeart size={12} />
          <span>Like</span>
        </div>
        <div className="flex gap-1 items-center text-xs text-thirdBlack cursor-pointer border border-secondaryGray rounded py-1 px-[10px]">
          <FaShare size={12} />
          <span>Share</span>
        </div>
        <div
          className="flex gap-1 items-center text-xs text-primaryError cursor-pointer border border-primaryError rounded py-1 px-[10px]"
          onClick={() => setShowDeleteModal(true)}
        >
          <FaTrashAlt size={12} />
        </div>
      </div>
    </section>
  );
}
