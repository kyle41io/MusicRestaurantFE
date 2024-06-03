import React from "react";

import { HiOutlineSearch } from "react-icons/hi";

export default function ResultBox() {
  return (
    <ul
      className="w-[474px] py-2 absolute border bottom-0 rounded-br-md rounded-bl-md -translate-x-3 translate-y-[108%]"
      style={{ boxShadow: "0px 4px 4px 0px rgba(171, 171, 171, 0.25)" }}
    >
      <span className="inline-block mb-3 px-6 text-sm font-medium text-thirdBlack">
        Result for "Anh"
      </span>
      <li className="flex items-center gap-2 px-6 h-8 text-xs font-normal hover:bg-gray-100 cursor-pointer">
        <HiOutlineSearch size={20} />
        <span className="text-xs text-thirdBlack">Anh</span>
      </li>
      <li className="flex items-center gap-2 px-6 h-8 text-xs font-normal hover:bg-gray-100 cursor-pointer">
        <HiOutlineSearch size={20} />
        <span className="text-xs text-thirdBlack">Anh nhớ em</span>
      </li>
      <li className="flex items-center gap-2 px-6 h-8 text-xs font-normal hover:bg-gray-100 cursor-pointer">
        <HiOutlineSearch size={20} />
        <span className="text-xs text-thirdBlack">Anh nhận ra</span>
      </li>
      <li className="flex  items-center gap-2 px-6 h-8 text-xs font-normal hover:bg-gray-100 cursor-pointer">
        <HiOutlineSearch size={20} />
        <span className="text-xs text-thirdBlack">Anh là tất cả</span>
      </li>
      <li className="flex items-center gap-2 px-6 h-8 text-xs font-normal hover:bg-gray-100 cursor-pointer">
        <HiOutlineSearch size={20} />
        <span className="text-xs text-thirdBlack">Anh yêu em</span>
      </li>
    </ul>
  );
}
