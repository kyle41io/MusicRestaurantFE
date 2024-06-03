"use client";

import { useTranslations } from "next-intl";

import React, { useState, useEffect } from "react";
import { FileProvider } from "@/store/FileProvider";

import AddSong from "@/components/pages/content/upload/AddSong";
import Complete from "@/components/pages/content/upload/Complete";
import StepBar from "@/components/pages/content/upload/StepBar";
import Information from "@/components/pages/content/upload/Information";
import ToastMessage from "@/components/shared/ToastMessage";

import "@/styles/upload/UploadStyle.css";

export default function UploadPage() {
  const t = useTranslations("Upload");

  const [currentStep, setCurrentStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(false);
  const [closingToast, setClosingToast] = useState(false);

  const handleCloseToast = () => {
    setClosingToast(true);
    setTimeout(() => {
      setShowToast(false);
      setClosingToast(false);
    }, 500);
  };

  useEffect(() => {
    let timeout;
    if (showToast) {
      timeout = setTimeout(() => {
        handleCloseToast();
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [showToast]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#0F0F0F]">
        {t("create_new_playlist")}
      </h1>
      <StepBar currentStep={currentStep} t={t} />
      <FileProvider>
        {currentStep === 1 && (
          <Information
            setCurrentStep={setCurrentStep}
            setShowToast={setShowToast}
            setError={setError}
            t={t}
          />
        )}
        {currentStep === 2 && (
          <AddSong
            setCurrentStep={setCurrentStep}
            setShowToast={setShowToast}
            setError={setError}
            t={t}
          />
        )}
        {currentStep === 3 && <Complete t={t} />}
      </FileProvider>

      <ToastMessage
        onClose={handleCloseToast}
        error={error}
        errorMessage={t("upload_error")}
        successMessage={t("upload_success")}
        showToast={showToast}
        closingToast={closingToast}
      />
    </main>
  );
}
