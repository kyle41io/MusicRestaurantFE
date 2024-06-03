"use client";
import Image from "next/image";

import CommentSection from "./Comment/CommentSection";

import { AiFillCaretDown } from "react-icons/ai";

import avatar from "@/assets/images/avatar.png";

export default function Information() {
  return (
    <section className="w-full flex gap-12">
      <div className="w-[19%] flex flex-col gap-4 items-center text-center">
        <div className="rounded-full w-[174px] h-[174px] flex justify-center items-center border border-primaryGray">
          <Image
            src={avatar.src}
            width={158}
            height={158}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <p className="text-thirdBlack text-2xl">N B D</p>
      </div>
      <div className="w-[78%] flex flex-col">
        <p>This is the description</p>
        <p>This is the description</p>
        <p>
          This is the description:{" "}
          <span className="text-primaryLink">
            https://link.com/this-is-the-link/test
          </span>
        </p>

        <p className="text-xs text-primaryGray flex items-center mt-6 gap-1">
          Show more{" "}
          <span>
            <AiFillCaretDown size={12} />
          </span>
        </p>

        <CommentSection />
      </div>
    </section>
  );
}
