"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import Link from "next/link";

import styles from "@/styles/content/home/Slider.module.css";
import { normalizePlaylistSong } from "@/utils/playlistSongs";

function Slider({ topPlayList_t, list }) {
  const sliderRef = useRef();
  const containerRef = useRef();
  const interValFake = useRef();

  const [showBlurLeft, setShowBlurLeft] = useState(false);

  useEffect(() => {
    sliderRef.current.style.left = "0px";
    sliderRef.current.style.right = `${
      -1790 + containerRef.current.offsetWidth
    }px`;
  }, []);

  const handleMove = (isLeft) => {
    clearInterval(interValFake.current);
    interValFake.current = setInterval(() => {
      if (isLeft && parseInt(sliderRef.current.style.left) < 0) {
        sliderRef.current.style.left = `${
          parseInt(sliderRef.current.style.left) + 10
        }px`;
        sliderRef.current.style.right = `${
          parseInt(sliderRef.current.style.right) - 10
        }px`;
      } else if (
        !isLeft &&
        parseInt(sliderRef.current.style.left) >
          -1790 + containerRef.current.offsetWidth
      ) {
        sliderRef.current.style.left = `${
          parseInt(sliderRef.current.style.left) - 10
        }px`;
        sliderRef.current.style.right = `${
          parseInt(sliderRef.current.style.right) + 10
        }px`;
      }
      setShowBlurLeft(!isLeft);
    }, 50);
  };

  const formatViews = (views) => {
    if (views < 1000) {
      return views.toString();
    } else {
      return (views / 1000).toFixed(3);
    }
  };

  return (
    <div className={styles["slider-container"]}>
      <div className={styles["slider-header"]}>
        <p className={styles["slider-title"]}>{topPlayList_t}</p>
        <div className={styles["move-buttons"]}>
          <button
            className={`${styles["move-button"]} left-arrow`}
            onMouseDown={() => handleMove(true)}
            onMouseUp={() => clearInterval(interValFake.current)}
          ></button>
          <button
            className={`${styles["move-button"]} right-arrow`}
            onMouseDown={() => handleMove(false)}
            onMouseUp={() => clearInterval(interValFake.current)}
          ></button>
        </div>
      </div>
      <div className={styles["blurs-container"]}>
        {showBlurLeft && <div className={styles["blur-left"]}></div>}
        {!showBlurLeft && <div className={styles["blur-right"]}></div>}
      </div>
      <div className={styles["main-slider"]} ref={containerRef}>
        <div className={styles["slider"]} ref={sliderRef}>
          {(list || []).map((item, index) => {
            const firstSong = normalizePlaylistSong(item.songList?.[0]);
            const image = item.image || firstSong.thumbnail;

            return (
            <Link
              href={`/music-detail?playlistId=${item.id}`}
              className={styles["card"]}
              key={item.id || index}
            >
              <div className={styles["views"]}>
                <div className="headphones"></div>
                <span className="text-xs text-white">
                  {formatViews(item.view || 0)}
                </span>
              </div>
              <div className={styles["info"]}>
                <p className={styles["member-name"]}>User #{item.userId}</p>
                <p className={styles["playlist-name"]}>{item.playlistName}</p>
              </div>
              {image ? (
                <img src={image} alt={item.playlistName} className={styles["img"]} />
              ) : (
                <div className={`${styles["img"]} w-full h-full bg-secondaryGray`} />
              )}
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Slider;
