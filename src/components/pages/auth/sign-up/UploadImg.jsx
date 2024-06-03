"use client";

import { useState } from "react";

import IcUpload from "@/assets/icons/IcUpload";

import styles from "@/styles/auth/sign-up/UploadImg.module.css";
import { useTranslations } from "next-intl";

function UploadImg({ onChange }) {
  const t = useTranslations("Auth")

  const [fileName, setFileName] = useState(t('no_file_chosen'));

  const handleChange = (event) => {
    onChange(event.target.files[0])
    setFileName(event.target.files[0].name);
  };

  return (
    <div className={styles["upload-avt"]}>
      <div className={styles["upload-button-container"]}>
        <label htmlFor="input-avt" className={styles["button-upload-avt"]}>
          <IcUpload />
          <span className="link text-xs">{t('upload_avatar')}</span>
          <input
            type="file"
            name=""
            id="input-avt"
            hidden
            onChange={handleChange}
          />
        </label>
      </div>
      <span className={styles["file-name-label"]}>{fileName}</span>
    </div>
  );
}

export default UploadImg;
