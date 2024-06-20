"use client";
import React, { useEffect, useRef, useState } from "react";

import { options } from "@/utils";

import PagingBar from "@/components/shared/PagingBar";

import CommentTextarea from "./CommentTextarea";
import CommentList from "./CommentList";
import { FaCommentAlt } from "react-icons/fa";

import { BiSolidChevronDown } from "react-icons/bi";

export default function CommentSection() {
  const optionListRef = useRef(null);
  
  const [showOption, setShowOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const clickOutside = (e) => {
      if (optionListRef.current && !optionListRef.current.contains(e.target)) {
        setShowOption(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <section className="flex flex-col mt-8 gap-5">
      <div className="w-full flex justify-between border-b border-b-secondaryGray">
        {/* Comment */}
        <div className="flex gap-2 items-center text-primaryGray text-xs">
          <FaCommentAlt size={12} />
          <span>99 comments</span>
        </div>

        {/* Sort dropdown */}
        <div
          className="flex w-[145px] h-[26px] gap-2 items-center border border-primary rounded mb-2 p-2 text-primary text-xs hover:bg-primary hover:text-white cursor-pointer relative z-50"
          onClick={() => setShowOption(!showOption)}
        >
          <span>Sorted by: {selectedOption}</span>
          <BiSolidChevronDown size={12} />
          {showOption && (
            <ul
              ref={optionListRef}
              className="w-[136px] absolute bg-white overflow-y-auto rounded left-0 bottom-0 translate-y-[115%] scrollbar"
              style={{ boxShadow: "0px 4px 4px 0px rgba(171, 171, 171, 0.25)" }}
            >
              {options.map((option, idx) => (
                <li
                  key={idx}
                  className="text-thirdBlack h-[26px] flex items-center p-2 rounded hover:bg-primary hover:text-white"
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <CommentTextarea />
      <CommentList />
      <PagingBar
        currentPage={currentPage}
        onClick={setCurrentPage}
        maxPage={25}
      />
    </section>
  );
}
