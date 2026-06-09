import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import IcLeftArrow from "@/assets/icons/IcLeftArrow";
import IcRightArrow from "@/assets/icons/IcRightArrow";
import IcHeadPhones from "@/assets/icons/IcHeadPhones";

import styles from "@/styles/content/home/Slider2.module.css";
import { getTopPlaylist } from "@/api/apiPlaylist";
import { normalizePlaylistSong } from "@/utils/playlistSongs";

export default function Slider2({ list }) {
  const t = useTranslations("Home");

  const sliderRef = useRef();

  const [isBlurLeft, setIsBlurLeft] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await getTopPlaylist({ page: 1, sort: "DESC" });
        setPlaylists(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching top playlists", error);
        setPlaylists([]);
      }
    };

    fetchPlaylists();
  }, []);

  const handleGoLeft = () => {
    sliderRef.current.scrollLeft -= 301;
    setIsBlurLeft(false);
    console.log(sliderRef.current.scrollLeft);
  };

  const handleGoRight = () => {
    sliderRef.current.scrollLeft += 301;
    setIsBlurLeft(true);
    console.log(sliderRef.current.scrollLeft);
  };

  return (
    <div className={styles["slider-container"]}>
      <div className={styles["slider-header"]}>
        <p className="text-4xl font-bold">{t("top_playlist")}</p>
        <div className={styles["move-buttons"]}>
          <button className={styles.buttons} onClick={handleGoLeft}>
            <IcLeftArrow />
          </button>
          <button className={styles.buttons} onClick={handleGoRight}>
            <IcRightArrow />
          </button>
        </div>
      </div>
      <div className={styles["blurs-container"]}>
        {isBlurLeft && <div className={styles["blur-left"]}></div>}
        {!isBlurLeft && <div className={styles["blur-right"]}></div>}
      </div>

      <div className={styles["slider-view"]} ref={sliderRef}>
        <div className={styles["slider"]}>
          {playlists.map((item, index) => {
            const firstSong = normalizePlaylistSong(item.songList?.[0]);
            const image = item.image || firstSong.thumbnail;

            return (
              <Link
                href={`/music-detail?playlistId=${item.id}`}
                className={styles["card"]}
                key={item.id || index}
              >
                <div className={styles["views"]}>
                  <IcHeadPhones />
                  <span className="text-xs text-white">{item.view || 0}</span>
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
