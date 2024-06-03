"use client";
import { DetailProvider } from "@/store/MusicDetailProvider";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import React, { useContext } from "react";
import { useAuth } from "@/hooks/useAuth";

import Button from "../shared/Button";
import ResultBox from "./HeaderComponents/ResultBox";
import UserAvatar from "./HeaderComponents/UserAvatar";

import { HiOutlineSearch } from "react-icons/hi";
import { MdPlaylistAdd } from "react-icons/md";
import logo from "@/assets/images/logo.png";

export default function Header() {
  const { userData } = useContext(DetailProvider);
  // const useAuthentication = useAuth();
  const trans = useTranslations("Header");
  const translate = useTranslations("Auth");

  return (
    <div className="sticky top-0 flex justify-center bg-primaryBlack w-full h-20 z-10">
      <div className="flex justify-between items-center md:gap-2 h-full 2xl:w-[1400px] xl:w-[1200px] lg:w-[1000px] md:w-[750px] sm:w-[600px] w-[350px]">
        {/* Logo form */}
        <Link href="/home">
          <div className="flex gap-2 items-center cursor-pointer">
            <Image
              src={logo.src}
              width={68}
              height={68}
              className="object-center min-w-[46px] min-h-[46px] sm:block md:block lg:block xl:block"
              alt="logo"
            />

            <div className="text-2xl text-white uppercase font-normal hidden xl:block">
              Music is life
            </div>
          </div>
        </Link>

        {/* Input form */}
        <form className="flex items-center relative">
          <input
            type="text"
            placeholder={trans("search_playlist_placeholder")}
            className="xl:h-12 lg:h-12 md:h-12  2xl:w-[450px] lg:w-[450px] xl:w-[450px] md:w-[360px] p-3 rounded-md placeholder:text-primaryGray placeholder:text-sm"
          />
          <HiOutlineSearch
            size={20}
            className="text-secondaryBlack absolute right-3"
          />

          {/* <ResultBox /> */}
        </form>

        {/* Buttons when there's no user */}

        {userData ? (
          <div className="flex gap-8 items-center">
            <Link href="/upload">
              <Button
                text={trans("create_playlist")}
                showIcon={{ icon: <MdPlaylistAdd /> }}
                iconSize={24}
                iconColor="text-white"
                className="w-[192px] gap-3"
              />
            </Link>
            <UserAvatar />
          </div>
        ) : (
          <div className="flex justify-between 2xl:gap-8 xl:gap-8 lg:gap-8 md:gap-4 sm:gap-3">
            <Link href="/auth/sign-in">
              <Button
                text={translate("sign_in")}
                className="w-12 sm:w-24 lg:w-32 xl:w-32 2xl:w-32"
              />
            </Link>
            <Link href="/auth/sign-up">
              <Button
                text={translate("sign_up")}
                color="primary"
                className="w-12 sm:w-24 lg:w-32 xl:w-32 2xl:w-32"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
