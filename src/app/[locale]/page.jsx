"use client";

import { useContext, useEffect } from "react";
import { useTranslations } from "next-intl";

import { useAuth } from "@/hooks/useAuth";

import HomePage from "./(content)/home/page";
// import { UserData } from "@/store/UserDataProvider";

function Page({ data }) {
  const t = useTranslations("Auth");

  // const { setIsLogin } = useContext(UserData);

  // useAuth();

  // useEffect(() => {
  //   setIsLogin(!!localStorage.getItem("token"));
  // }, []);

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default Page;
