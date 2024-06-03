"use client";
import React, { useState } from "react";

import { BsCheck2 } from "react-icons/bs";

import "@/styles/upload/StepBar.css";

const StepBar = ({ currentStep, t }) => {
  const steps = [t("information"), t("add_songs"), t("complete")];

  const [complete, setComplete] = useState(false);

  return (
    <div className="flex my-10 z-0">
      {steps?.map((step, i) => (
        <div
          key={i}
          className={`step-item ${currentStep === i + 1 && "active"} ${
            (i + 1 < currentStep || complete) && "complete"
          } `}
        >
          <div className="step">
            {i + 1 < currentStep || complete ? (
              <BsCheck2 size={12} strokeWidth={1} color="white" cla />
            ) : null}
          </div>
          <p className=" step-text">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default StepBar;
