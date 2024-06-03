import Image from "next/image";

import { useRef, useState } from "react";

import useAutoResizeTextArea from "@/hooks/useAutoResizeTextArea";

import avatar from "@/assets/images/avatar.png";

export default function CommentTextarea() {
  const textAreaRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  useAutoResizeTextArea(textAreaRef.current, inputValue);

  const handleChange = (evt) => {
    if (evt.target.value.length <= textAreaRef.current?.maxLength) {
      setInputValue(evt.target.value);
    }
  };
  return (
    <div className="w-full flex py-2 items-center rounded border-t border-b bg-[#f6f6f6] border-t-secondaryGray border-b-secondaryGray relative">
      <textarea
        ref={textAreaRef}
        className="w-[89%] h-[40px] p-2 ml-3 rounded leading-6 focus:outline-none placeholder:text-xs placeholder:text-primaryGray"
        placeholder="Write a comment"
        cols={800}
        value={inputValue}
        onChange={handleChange}
        maxLength={250}
      />
      <Image
        src={avatar.src}
        width={40}
        height={40}
        alt="Avatar"
        className="absolute rounded-full top-2 right-3"
      />
    </div>
  );
}
