"use client";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  isOpen,
  disabled,
  className,
  title,
  buttonTitle = "Save",
  body,
  onClose,
}) => {


  return (
    <>
      {/* Background container */}
      {isOpen && (
        <div
          className="justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70"
        >
          {/* Main modal */}
          <div
            className={`translate
              h-[147px] 
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              p-3
              flex-col 
              w-[393px]
              bg-white 
              gap-5
              outline-none 
              focus:outline-none ${className}`}
          >
            {/* Header */}
            <header className="flex justify-between">
              <p className="text-sm">{title}</p>
              <button
                className="cursor-pointer text-primaryGray"
                onClick={onClose}
              >
                <IoMdClose size={16} />
              </button>
            </header>

            {/* Body */}
            <div className="flex-auto items-center text-xs font-normal rounded">
              {body}
            </div>

            <footer className="flex justify-end gap-3 text-xs">
              <button className="text-primaryGray p-1" onClick={onClose}>
                Cancel
              </button>
              <button className="text-white border rounded bg-primaryError py-[2px] px-2">
                {buttonTitle}
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
