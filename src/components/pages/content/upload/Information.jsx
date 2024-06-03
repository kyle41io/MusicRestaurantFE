"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";

import storage from "@/lib/firebaseConfig";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

import FileContext from "@/store/FileProvider";


import { slugify } from "@/utils/slugify";

import Input from "./Information/InputUpload";
import Dropdown from "./Information/DropDown";

import LoadingIcon from "@/assets/icons/LoaddingIcon";
import CameraIcon from "@/assets/icons/CameraIcon";

import "@/styles/upload/Information.css";

const Information = ({ setCurrentStep, t }) => {
  const router = useRouter();

  const { setInfoPlaylist } = useContext(FileContext);
  const { setUploadedImageFile } = useContext(FileContext);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [errorImage, setErrorImage] = useState(false);
  const [percentImage, setPercentImage] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [genre, setGenre] = useState("None");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");

  const handleCancle = () => {
    router.back();
  };

  const handleImageUpload = (file) => {
    const fileSizeInBytes = file.size;
    const maxFileSize = 5 * 1024 * 1024;

    if (fileSizeInBytes > maxFileSize) {
      setErrorImage(true);
      return;
    } else {
      setErrorImage(false);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(file);
      setUploadedImageFile(imageUrl);
      setUploadedImageURL(imageUrl);
    }
  };

  const handleNext = async () => {
    if (!title) {
      return;
    } else {
      if (uploadedImage) {
        const imageFileRef = ref(
          storage,
          `/files/${slug}/${uploadedImage.name}`
        );
        const imageUploadTask = uploadBytesResumable(
          imageFileRef,
          uploadedImage
        );
        setInfoPlaylist((prevInfoPlaylist) => ({
          ...prevInfoPlaylist,
          ref: imageFileRef,
        }));

        imageUploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercentImage(percent);
            if (percent === 100) setCurrentStep(2);
          },
          (error) => {
            console.log(error);
          },
          async () => {}
        );
      }

      if (!uploadedImage) {
        setCurrentStep(2);
      }
    }
  };

  const handleChangeTitle = (title) => {
    setTitle(title);
    setSlug(slugify(title));
    if (title && slug) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChangeArtist = (artist) => {
    setArtist(artist);
    setInfoPlaylist((prevInfoPlaylist) => ({
      ...prevInfoPlaylist,
      artist: artist,
    }));
  };

  useEffect(() => {
    setInfoPlaylist((prevInfoPlaylist) => ({
      ...prevInfoPlaylist,
      title: title,
      slug: slug,
    }));
  }, [title, slug, setInfoPlaylist]);

  return (
    <div
      className={`flex flex-col justify-center items-center h-[440px] w-[645px] p-6 gap-3 rounded-md border border-[#DCDCDC] shadow-[0px_0px_8px_0px_rgba(51,51,51,0.10)]`}
    >
      <div className="flex gap-6">
        <div className="">
          <div
            className={`h-[200px] w-[200px] flex flex-col justify-end items-center rounded-lg bg-center bg-cover bg-no-repeat border-2 `}
            style={{
              backgroundImage: uploadedImageURL
                ? `url(${uploadedImageURL})`
                : "linear-gradient(135deg, #9A8080 0%, #82A8C2 100%)",
              borderColor: errorImage ? "red" : "",
            }}
          >
            <input
              id="image"
              type="file"
              accept=".jpg,.png"
              className="hidden"
              onChange={(event) => handleImageUpload(event.target.files[0])}
              maxfilesize={5 * 1024 * 1024}
            />
            <label
              className="flex gap-1 justify-center items-center w-32 h-6 text-xs bg-white rounded-md mb-4 hover:opacity-80 cursor-pointer"
              htmlFor="image"
            >
              <CameraIcon />
              <p>{t("upload_image")}</p>
            </label>
          </div>
          {errorImage ? (
            <p className="text-red-400 text-xs">{t("invalid_image")}</p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col h-[346px] w-[373px] gap-3 items-center justify-center text-xs">
          <Input
            value={title}
            onChange={(e) => handleChangeTitle(e)}
            required
            label={t("title")}
          />
          <Input disabled value={slug} required label={"Slug"} />
          <div className="w-full flex gap-3">
            <div style={{ width: "calc(50% - 6px)" }}>
              <Dropdown
                genre={genre}
                setGenre={setGenre}
                setInfoPlaylist={setInfoPlaylist}
              />
            </div>

            <div style={{ width: "calc(50% - 6px)" }}>
              <Input
                value={artist}
                onChange={(e) => handleChangeArtist(e)}
                label={t("artist")}
              />
            </div>
          </div>
          <Input
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e)}
            label={t("description")}
          />
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <p className="text-black text-xs">
          <span className="text-red-500 font-bold text-base ml-1">*</span>{" "}
          {t("required_fields")}
        </p>
        <div className="flex gap-4">
          <button
            className="flex items-center px-2 py-1 rounded-md  hover:bg-slate-300"
            onClick={handleCancle}
          >
            {t("cancel")}
          </button>
          <button
            className={`flex items-center justify-center px-2 py-1 w-[55px] h-full bg-primary text-white rounded-md hover:bg-orange-700 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
          >
            {percentImage !== 100 && percentImage !== 0 ? (
              <div className="circle">
                <LoadingIcon />
              </div>
            ) : (
              <p>{t("next")}</p>
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center gap-28">
        {percentImage !== 100 && percentImage !== 0 && (
          <div className="flex flex-col justify-center items-center text-slate-200 text-sm font-semibold">
            <progress
              className="w-48 h-1 rounded-md"
              value={percentImage}
              max="100"
            ></progress>
          </div>
        )}
      </div>
    </div>
  );
};
export default Information;
