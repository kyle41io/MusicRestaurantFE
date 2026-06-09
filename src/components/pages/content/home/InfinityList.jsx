import { useMemo } from "react";

import IcPlayWhite2 from "@/assets/icons/IcPlayWhite2";

import styles from "@/styles/content/home/InfinityList.module.css";
import { normalizePlaylistSong } from "@/utils/playlistSongs";

function InfinityList({ songs = [] }) {
  const internalSongs = useMemo(
    () => songs.map(normalizePlaylistSong).slice(0, 5),
    [songs]
  );

  return (
    <div className={styles["my-playlist-songs"]}>
      {internalSongs.map((song, songIndex) => (
        <div className={styles["my-playlist-song"]} key={songIndex}>
          <p className={styles["song-info"]}>
            {song.songName} - {song.singer}
          </p>
          <div className={styles["song-views"]}>
            <IcPlayWhite2 />
            <p>{song.duration || ""}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InfinityList;
