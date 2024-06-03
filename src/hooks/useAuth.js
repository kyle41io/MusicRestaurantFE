"use client";

import { DetailProvider } from "@/store/MusicDetailProvider";

import { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const { userData, setUserData } = useContext(DetailProvider);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/sign-in", {
        scroll: true,
      });
    } else {
      setUserData(token);
    }
  }, []);
}
