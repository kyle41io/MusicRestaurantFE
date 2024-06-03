import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import TOP_PLAYLIST from "@/constants/topPlaylist";

import IcLeftArrow from "@/assets/icons/IcLeftArrow";
import IcRightArrow from "@/assets/icons/IcRightArrow";
import IcHeadPhones from "@/assets/icons/IcHeadPhones";

import styles from "@/styles/content/home/Slider2.module.css";

export default function Slider2({ list }) {
  const t = useTranslations("Home");

  const sliderRef = useRef();

  const [isBlurLeft, setIsBlurLeft] = useState(false);

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
          {TOP_PLAYLIST.map((item, index) => (
            <div className={styles["card"]} key={index}>
              <div className={styles["views"]}>
                <IcHeadPhones />
                <span className="text-xs text-white">{item.views}</span>
              </div>
              <div className={styles["info"]}>
                <p className={styles["member-name"]}>{item.member}</p>
                <p className={styles["playlist-name"]}>{item.title}</p>
              </div>
              <img src={item.img_src} className={styles["img"]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
