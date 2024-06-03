"use client";
import React, { createContext, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [infoPlaylist, setInfoPlaylist] = useState({
    title: null,
    artist: null,
    genre: null,
    slug: null,
    ref: null,
  });
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <FileContext.Provider
      value={{
        infoPlaylist,
        setInfoPlaylist,
        uploadedImageFile,
        setUploadedImageFile,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContext;
