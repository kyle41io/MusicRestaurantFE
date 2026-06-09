'use client'
import { useTranslations } from "use-intl";
import Link from "next/link";

import PlayingBeat from "./PlayingBeat";

import IcPlayGray from "@/assets/icons/IcPlayGray";
import IcHeartGray from "@/assets/icons/IcHeartGray";

import styles from "@/styles/shared/CommonTable.module.css";
import IcPlayBlack from "@/assets/icons/IcPlayBlack";
import { normalizePlaylistSong } from "@/utils/playlistSongs";

function CommonTable({ list, headerList, playingIndex, setPlayingIndex }) {

  const t = useTranslations("Home");

  const createDataList = (item, index) => {
    const firstSong = normalizePlaylistSong(item.songList?.[0], 0);
    const image = item.image || firstSong.thumbnail;

    return {
      no: index + 1,
      song: (
        <>
          {image ? (
            <img
              src={image}
              alt={item.playlistName}
              className={styles["new-playlist-img"]}
            />
          ) : (
            <div className={`${styles["new-playlist-img"]} bg-secondaryGray`} />
          )}
          <div className={styles["new-playlist-info"]}>
            <p className="text-sm">{item.playlistName}</p>
            <div className={styles["new-playlist-view-like"]}>
              <div className={styles["new-playlist-vl"]}>
                <IcPlayGray />
                <div>{item.view || 0}</div>
              </div>
              <div className={styles["new-playlist-vl"]}>
                <IcHeartGray width={10}/>
                <div>0</div>
              </div>
            </div>
          </div>
        </>
      ),
      author: `User #${item.userId}`,
      genre: "YouTube",
      tracks: item.songList?.length || 0,
      isPlaying: <>
        {index === playingIndex ? <PlayingBeat onClick={setPlayingIndex} /> : (
          <Link
            className="cursor-pointer"
            href={`/music-detail?playlistId=${item.id}`}
            onClick={() => setPlayingIndex(index)}
          >
            <IcPlayBlack />
          </Link>
        )}
        <IcHeartGray width={20}/>
      </>
    };
  };

  return (
    <div className={styles['new-playlists']}>
      <div className={styles["header"]}>
        {headerList.map((item, index) =>
          <div className={styles[item.key]} key={index}>{t(item.label)}</div>
        )}
      </div>
      {(list.map((i, id) => createDataList(i, id))).map((item, index) =>
        <div className={`${styles['new-playlist']} ${index === playingIndex && styles.playing}`} key={index}>
          {headerList.map((headerItem, headerIndex) =>
            <div className={`${styles[`new-playlist-${headerItem.key}`]} px-2.5 py-2`} key={headerIndex}>
              {item[headerItem.key]}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CommonTable;
