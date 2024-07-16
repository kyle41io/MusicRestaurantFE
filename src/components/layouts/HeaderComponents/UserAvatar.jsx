"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import Link from "next-intl/link";
import axios from "axios";
import Image from "next/image";
import { BiSolidChevronDown } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { DetailProvider } from "@/store/MusicDetailProvider";


export default function UserAvatar() {
  const router = useRouter();
  const userId = localStorage.getItem("id");

  const { setShowUserModal } = useContext(DetailProvider);

  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const trans = useTranslations("Header");

  const handleSignOut = () => {
    localStorage.clear();
    location.reload();
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`
        );
        const userData = response.data;
        setAvatarSrc(userData.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const clickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
        setShowLanguageOptions(false);
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
      <div className="rounded-full w-12 h-12 cursor-pointer flex items-center justify-center">
        <img
          src={avatarSrc}
          width="48"
          height="48"
          alt="Avatar"
          className="rounded-full"
        />
      </div>
      <BiSolidChevronDown size={24} className="text-white cursor-pointer" />
      {showMenu && (
        <ul
          className="w-[218px] text-sm absolute bg-white rounded-br-md rounded-bl-md bottom-0 py-1 right-0 translate-y-[100%] z-20"
          style={{ boxShadow: "0px 4px 4px 0px rgba(171, 171, 171, 0.25)" }}
        >
          <li className="h-12 py-3 px-4 cursor-pointer font-medium text-thirdBlack hover:bg-gray-100" onClick={() => setShowUserModal(true)}>
            {trans("my_profile")}
          </li>
          <li
            className="h-12 py-3 px-4 cursor-pointer font-medium text-thirdBlack flex justify-between hover:bg-gray-100 relative"
            onMouseEnter={() => setShowLanguageOptions(true)}
            onMouseLeave={() => setShowLanguageOptions(false)}
          >
            <p>{trans("changeLanguage")}</p>
            <div className="text-primaryGray flex flex-col absolute left-[100%] top-0">
              {showLanguageOptions && (
                <>
                  <Link
                    href={"/"}
                    locale="en"
                    className="h-12 w-32 py-3 px-4 cursor-pointer font-medium hover:bg-gray-200 rounded-sm"
                    style={{
                      boxShadow: "0px 4px 4px 0px rgba(171, 171, 171, 0.25)",
                    }}
                  >
                    English
                  </Link>
                  <Link
                    href={"/"}
                    locale="vi"
                    className="h-12 w-32 py-3 px-4 cursor-pointer font-medium bg-gray-100 hover:bg-gray-200 rounded-sm"
                    style={{
                      boxShadow: "0px 4px 4px 0px rgba(171, 171, 171, 0.25)",
                    }}
                  >
                    Tiếng Việt
                  </Link>
                </>
              )}
            </div>
          </li>
          <li
            className="h-12 py-3 px-4 cursor-pointer font-medium text-thirdBlack hover:bg-gray-100"
            onClick={handleSignOut}
          >
            <span className="text-primaryError">{trans("sign_out")}</span>
          </li>
        </ul>
      )}
    </div>
  );
}
