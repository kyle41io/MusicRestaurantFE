import { BsCheck2 } from "react-icons/bs";

// import "../../styles/shared/ToastMessage.css";
import "@/styles/shared/ToastMessage.css";

import XIcon from "@/assets/icons/XIcon";

const ToastMessage = ({
  onClose,
  error,
  errorMessage,
  successMessage,
  showToast,
  closingToast,
}) => {
  return (
    <div
      className={`toast-container ${showToast && !closingToast ? "show" : ""} ${
        closingToast ? "closing" : ""
      }`}
    >
      {showToast && (
        <div
          className={`flex justify-between items-center w-[326px] h-[48px] rounded-lg p-[10px] pr-[16px] border-2 `}
          style={{
            borderColor: error ? "#FF4040" : "#1AB232",
            background: error ? "#fad5d2" : "#e4fae3",
          }}
        >
          <div
            className="flex items-center justify-center w-6 h-6 rounded-full"
            style={{
              background: error ? "#FF4040" : "#1AB232",
            }}
          >
            <BsCheck2 size={18} strokeWidth={1} color="white" />
          </div>
          <p className="w-[190px]">{error ? errorMessage : successMessage}</p>
          <button onClick={onClose}>
            <XIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ToastMessage;
