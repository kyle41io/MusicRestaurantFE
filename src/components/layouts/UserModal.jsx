"use client";

import React, { useState, useMemo, useContext, useEffect } from "react";
import { DetailProvider } from "@/store/MusicDetailProvider";
import { useTranslations } from "next-intl";
import { getUser } from "@/api/apiUser";

import Modal from "../shared/Modal";
import UploadImg from "../pages/auth/sign-up/UploadImg";
import Input from "@/components/shared/Input";
import IcCard from "@/assets/icons/IcCard";
import IcPerson from "@/assets/icons/IcPerson";
import IcLock from "@/assets/icons/IcLock";
import IcKey from "@/assets/icons/IcKey";

export default function UserModal() {
  const { showUserModal, setShowUserModal } = useContext(DetailProvider);
 
  const userId = typeof window !== "undefined" ? localStorage.getItem("id") : "";
  const t = useTranslations("Auth");

  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [img, setImg] = useState();
  const [isErrorDisplayName, setIsErrorDisplayName] = useState(false);
  const [isErrorUserName, setIsErrorUserName] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorRepeatPassword, setIsErrorRepeatPassword] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("");

  const isError = useMemo(() => {
    return (
      isErrorDisplayName ||
      isErrorUserName ||
      isErrorPassword ||
      isErrorRepeatPassword ||
      !displayName ||
      !userName ||
      !password ||
      !repeatPassword
    );
  }, [
    displayName,
    userName,
    password,
    repeatPassword,
    isErrorDisplayName,
    isErrorUserName,
    isErrorPassword,
    isErrorRepeatPassword,
  ]);

  const handleBlurDisplayName = () => {
    if (!displayName.match(/^.{6,32}$/)) {
      setIsErrorDisplayName(true);
    } else {
      setIsErrorDisplayName(false);
    }
  };

  const handleBlurPassword = () => {
    if (
      !password.match(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,32}$/
      )
    ) {
      setIsErrorPassword(true);
    } else {
      setIsErrorPassword(false);
    }
  };

  const handleBlurRepeatPassword = () => {
    if (repeatPassword !== password) {
      setIsErrorRepeatPassword(true);
    } else {
      setIsErrorRepeatPassword(false);
    }
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) return;
        const response = await getUser(userId);
        const userData = response.data;
        setAvatarSrc(userData.avatar);
        setDisplayName(userData.name);
        setUserName(userData.username);
        setDisplayName(userData.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const bodyContent = (
    <div className="flex place-items-center justify-around">
      <div className="flex flex-col items-center">
        <div className="rounded-full w-28 h-28 cursor-pointer flex items-center justify-center">
          <img
            src={avatarSrc}
            width="100"
            height="100"
            alt="Avatar"
            className="rounded-full"
          />
        </div>
        <UploadImg onChange={setImg} />
      </div>
      <div className="min-w-[395px]">
        <Input
          value={displayName}
          type={"text"}
          placeholder={t("display_name")}
          icon={<IcCard />}
          setDataState={setDisplayName}
          onBlur={handleBlurDisplayName}
          isError={isErrorDisplayName}
          errorMessage={"Display name must have 6-32 characters"}
        />
        <Input
          value={password}
          type={"password"}
          placeholder={t("password")}
          icon={<IcLock />}
          setDataState={setPassword}
          onBlur={handleBlurPassword}
          isError={isErrorPassword}
          errorMessage={
            "Password must have 1 uppercase, 1 special character, 1 number and 8-32 characters"
          }
        />
        <Input
          value={repeatPassword}
          type={"password"}
          placeholder={t("repeat_password")}
          icon={<IcKey />}
          setDataState={setRepeatPassword}
          onBlur={handleBlurRepeatPassword}
          isError={isErrorRepeatPassword}
          errorMessage={
            "Please make sure that you have correctly repeated your password!"
          }
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={showUserModal}
      body={bodyContent}
      buttonTitle="Save"
      onClose={handleCloseModal}
      height="full"
      width="600px"
    />
  );
}
