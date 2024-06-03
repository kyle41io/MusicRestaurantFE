'use client'
import { useTranslations } from "use-intl";

import PlayingBeat from "./PlayingBeat";

import IcPlayGray from "@/assets/icons/IcPlayGray";
import IcHeartGray from "@/assets/icons/IcHeartGray";

import styles from "@/styles/shared/CommonTable.module.css";
import IcPlayBlack from "@/assets/icons/IcPlayBlack";

function CommonTable({ list, headerList, playingIndex, setPlayingIndex }) {

  const t = useTranslations("Home");

  const createDataList = (item, index) => {
    return {
      no: item.no,
      song: (
        <>
          <img
            src={item.song.img_src}
            className={styles["new-playlist-img"]}
          />
          <div className={styles["new-playlist-info"]}>
            <p className="text-sm">{item.song.name_playlist}</p>
            <div className={styles["new-playlist-view-like"]}>
              <div className={styles["new-playlist-vl"]}>
                <IcPlayGray />
                <div>{item.song.views}</div>
              </div>
              <div className={styles["new-playlist-vl"]}>
                <IcHeartGray width={10}/>
                <div>{item.song.likes}</div>
              </div>
            </div>
          </div>
        </>
      ),
      author: item.author,
      genre: item.genre,
      tracks: item.tracks,
      isPlaying: <>
        {index === playingIndex ? <PlayingBeat onClick={setPlayingIndex} /> : <div className="cursor-pointer" onClick={() => setPlayingIndex(index)}>
          <IcPlayBlack />
        </div>}
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
