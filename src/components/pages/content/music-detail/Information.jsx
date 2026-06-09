"use client";
import CommentSection from "./Comment/CommentSection";

import { AiFillCaretDown } from "react-icons/ai";

export default function Information({ playlist, tracks = [] }) {
  return (
    <section className="w-full flex gap-12">
      <div className="w-[19%] flex flex-col gap-4 items-center text-center">
        <div className="rounded-full w-[174px] h-[174px] flex justify-center items-center border border-primaryGray">
          {playlist?.image ? (
            <img
              src={playlist.image}
              alt={playlist.playlistName}
              className="rounded-full w-[158px] h-[158px] object-cover"
            />
          ) : (
            <div className="rounded-full w-[158px] h-[158px] bg-gradient-to-br from-[#9A8080] to-[#82A8C2]" />
          )}
        </div>
        <p className="text-thirdBlack text-2xl">{playlist?.playlistName}</p>
      </div>
      <div className="w-[78%] flex flex-col">
        <p>{tracks.length} songs selected from YouTube.</p>
        <p>Playlist id: {playlist?.id}</p>
        <p>
          Playback uses the embedded YouTube player for each selected song.
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
