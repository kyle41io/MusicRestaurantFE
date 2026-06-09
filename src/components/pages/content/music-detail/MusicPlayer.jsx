"use client";
export default function MusicPlayer({ track, playlist }) {
  if (!track) {
    return (
      <div className="w-full h-[180px] bg-primaryBlack flex items-center justify-center text-white">
        Select a song to play
      </div>
    );
  }

  return (
    <div className="w-full flex-col bg-primaryBlack">
      <section className="flex p-5 justify-between">
        <div className="flex rounded gap-6">
          <img
            src={track.image}
            alt="Song image"
            className="w-[98px] h-[98px] rounded object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-normal text-white capitalize">
              {track.songName}
            </h2>
            <h4 className="text-xs font-normal text-white capitalize">
              {track.singer}
            </h4>
          </div>
        </div>

        <p className="w-[93px] h-[22px] rounded-xl bg-primaryGray flex justify-center items-center text-white text-xs">
          # {playlist?.playlistName || "Playlist"}
        </p>
      </section>

      <div className="w-full aspect-video bg-black">
        <iframe
          className="w-full h-full"
          src={`${track.embedUrl}?autoplay=1&rel=0`}
          title={track.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
