"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";

import FileContext from "@/store/FileProvider";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

import CopyIcon from "@/assets/icons/CopyIcon";

const Complete = ({ t }) => {
  const router = useRouter();

  const { infoPlaylist, uploadedImageFile } = useContext(FileContext);
  const { title, artist, genre, ref } = infoPlaylist;

  const [copySuccess, setCopySuccess] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const handleCopyLink = () => {
    const linkInput = document.getElementById("link-input");
    linkInput.select();
    document.execCommand("copy");
    setCopySuccess(true);

    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  // useEffect(() => {
  //   const storage = getStorage();
  //   const storageRef = ref;

  //   uploadBytes(storageRef, uploadedImageFile)
  //     .then((snapshot) => {
  //       getDownloadURL(snapshot.ref)
  //         .then((url) => {
  //           setAudioURL(url);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [uploadedImageFile, ref]);

  return (
    <div className="flex flex-col items-center p-14 gap-6 ">
      <div className="flex justify-start items-center min-h-[162px] w-[645px] p-10 gap-10 rounded-md border border-[#DCDCDC] shadow-[0px_0px_8px_0px_rgba(51,51,51,0.10)]">
        <div
          style={{
            backgroundImage: uploadedImageFile
              ? `url(${uploadedImageFile})`
              : "linear-gradient(135deg, #9A8080 0%, #82A8C2 100%)",
          }}
          className="rounded-md w-32 h-32 bg-center bg-cover"
          alt=""
        />

        <div className="flex w-[410px] flex-col gap-2">
          <h2 className="text-[#0F0F0F] font-semibold text-base">{title}</h2>
          <div className="max-w-full flex text-sm gap-1 ">
            <p className="break-all">
              {genre ? genre : "None"} - {artist ? artist : "N/A"}
            </p>
          </div>

          <div className=" w-full flex flex-col gap-[2px]">
            <div className="relative">
              <input
                id="link-input"
                name="link"
                type="text"
                placeholder={audioURL ? "" : "loading..."}
                className="bg-slate-100/50 w-3/4 text-blue-600 p-2 pr-10 text-xs h-7"
                value={audioURL}
                readOnly
              />
              <div
                className="flex justify-center items-center w-5 h-5 rounded-md absolute right-28 top-1/2 -translate-y-[10px] cursor-pointer hover:bg-primary/50"
                onClick={handleCopyLink}
              >
                <span className="">
                  <CopyIcon />
                </span>
              </div>
              <button className="text-sm ml-2 bg-primary hover:bg-orange-700 rounded p-1 px-2 text-white">
                {t("play_now")}
              </button>
              {copySuccess && (
                <div className="bg-green-500/80 text-slate-200 text-xs absolute p-1 -bottom-8 left-0 ml-2 mb-1 rounded-md">
                  {t("copy")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="text-[#979797]">
        <button
          className="text-blue-600 hover:text-blue-600/80"
          onClick={() => router.push("/home")}
        >
          {t("go_home")}
        </button>{" "}
        {t("or")}{" "}
        <button
          className="text-blue-600 hover:text-blue-600/80"
          onClick={() => window.location.reload()}
        >
          {t("create_another_playlist")}
        </button>
      </div>
    </div>
  );
};

export default Complete;
