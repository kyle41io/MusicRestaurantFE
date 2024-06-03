import Image from "next/image";

import avatar from "@/assets/images/avatar.png";

export default function CommentItem() {
  return (
    <li className="w-full flex justify-between ">
      <div className="flex gap-2">
        <Image
          src={avatar.src}
          width={46}
          height={46}
          alt="Avatar"
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          {/* Username */}
          <h5 className="text-sm text-primaryGray">N B D</h5>
          <p className="text-sm text-thirdBlack">hay lắm bạn</p>
        </div>
      </div>

      <p className="text-primaryGray text-xs">Just now</p>
    </li>
  );
}
