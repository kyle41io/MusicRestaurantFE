"use client";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { BiSolidChevronDown } from "react-icons/bi";

import avatar from "@/assets/images/avatar.png";

import { useTranslations } from "next-intl";


export default function UserAvatar() {
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const trans = useTranslations("Header");

  useEffect(() => {
    const clickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className={`${
        showMenu ? "bg-black" : ""
      } w-[108px] h-20 flex gap-3 items-center justify-center relative`}
      onClick={() => setShowMenu(!showMenu)}
    >
      <div className="rounded-full w-12 h-12 bg-white cursor-pointer">
        <Image
          src={avatar.src}
          width={48}
          height={48}
          alt="Avatar"
          className=""
        />
      </div>
      <BiSolidChevronDown size={24} className="text-white cursor-pointer" />
      {showMenu && (
        <ul
          className="w-[218px] text-sm absolute bg-white rounded-br-md rounded-bl-md bottom-0 py-1 right-0 translate-y-[100%] z-20"
          style={{ boxShadow: "0px 4px 4px 0px rgba(171, 171, 171, 0.25)" }}
        >
          <li className="h-12 py-3 px-4 cursor-pointer font-medium text-thirdBlack hover:bg-gray-100">
            {trans("my_profile")}
          </li>
          <li className="h-12 py-3 px-4 cursor-pointer font-medium text-thirdBlack flex justify-between hover:bg-gray-100">
            <p>{trans("changeLanguage")}</p>
            <p className="text-primaryGray">Vi</p>
          </li>
          <li className="h-12 py-3 px-4 cursor-pointer font-medium text-thirdBlack hover:bg-gray-100">
            <span className="text-primaryError">{trans("sign_out")}</span>
          </li>         
        </ul>
      )}
    </div>
  );
}
