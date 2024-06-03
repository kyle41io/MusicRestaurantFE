import { useState, useEffect, useRef, useCallback } from "react";

import { getList } from "@/constants/myPlayListMock";

import IcPlayWhite2 from "@/assets/icons/IcPlayWhite2";
import IcSpinner from "@/assets/icons/IcSpinner";

import styles from "@/styles/content/home/InfinityList.module.css";

function InfinityList({ playListId, index }) {
  const [internalSongs, setInternalSongs] = useState([]);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const [segment, setSegment] = useState(0);
  const [isLoadable, setIsLoadable] = useState(true);

  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && isLoadable) {
          setSegment((prev) => {
            return prev + 1;
          });
          setIsScrollEnd(true);
        } else {
          setIsScrollEnd(false);
        }
      });
    });
    observer.current.observe(
      document.querySelector(`.spinner-element.s${index}`)
    );

    return () => {
      observer.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const appendList = getList(segment, 5).list;
    const length = getList(segment, 5).length;
    const newList = [...internalSongs, ...appendList];
    setInternalSongs(newList);
    if (segment * 5 === length) {
      setIsLoadable(false);
    }
  }, [segment]);

  useEffect(() => {
    if (!isLoadable) {
      setIsScrollEnd(false);
      observer.current.disconnect();
    }
  }, [isLoadable]);

  return (
    <div className={styles["my-playlist-songs"]}>
      {internalSongs.map((song, songIndex) => (
        <div className={styles["my-playlist-song"]} key={songIndex}>
          <p className={styles["song-info"]}>
            {song.name_song} - {song.author_song}
          </p>
          <div className={styles["song-views"]}>
            <IcPlayWhite2 />
            <p>{song.views_song}</p>
          </div>
        </div>
      ))}
      <div className={`px-1 py-2 spinner-element s${index}`}>
        <div
          className={`${styles.loading} ${isScrollEnd ? styles.appear : ""}`}
        >
          <IcSpinner />
        </div>
      </div>
    </div>
  );
}

export default InfinityList;
