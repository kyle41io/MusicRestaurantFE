"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import PagingBar from "@/components/shared/PagingBar";
import InfinityList from "./InfinityList";

import IcPlayOrange from "@/assets/icons/IcPlayOrange";

import styles from "@/styles/content/home/MyPlaylist.module.css";
import { getUserPlaylists } from "@/api/apiPlaylist";
import { normalizePlaylistSong } from "@/utils/playlistSongs";

function MyPlaylist() {
  const [currentPage, setCurrentPage] = useState(1);
  const [playlists, setPlaylists] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  const t = useTranslations("Home");

  useEffect(() => {
    const fetchPlaylists = async () => {
      const userId =
        typeof window !== "undefined" ? Number(localStorage.getItem("id")) : 0;

      if (!userId) {
        setPlaylists([]);
        setRowCount(0);
        return;
      }

      try {
        const response = await getUserPlaylists({
          userId,
          page: currentPage,
          sort: "DESC",
        });
        setPlaylists(response.data?.data || []);
        setRowCount(response.data?.rowCount || 0);
      } catch (error) {
        console.error("Error fetching user playlists", error);
        setPlaylists([]);
        setRowCount(0);
      }
    };

    fetchPlaylists();
  }, [currentPage]);

  return (
    <div className={styles["my-playlists-container"]}>
      <div className={styles["my-playlists-header"]}>
        <p className={styles["title"]}>{t("my_playlist")}</p>
        <Link href={"./../upload"} className="links">
          {t("create_new")}
        </Link>
      </div>
      <div>
        <div className={styles["my-playlists"]}>
          {playlists.map((item, index) => {
            const firstSong = normalizePlaylistSong(item.songList?.[0]);
            const image = item.image || firstSong.thumbnail;

            return (
              <div className={styles["my-playlist"]} key={item.id || index}>
                {image ? (
                  <img
                    src={image}
                    alt={item.playlistName}
                    className={styles["my-playlist-bg"]}
                  />
                ) : (
                  <div
                    className={`${styles["my-playlist-bg"]} bg-secondaryGray`}
                  />
                )}
                <div className={styles["my-playlist-img-container"]}>
                  {image ? (
                    <img
                      src={image}
                      alt={item.playlistName}
                      className={styles["my-playlist-img"]}
                    />
                  ) : (
                    <div
                      className={`${styles["my-playlist-img"]} bg-secondaryGray`}
                    />
                  )}
                  <Link
                    href={`/music-detail?playlistId=${item.id}`}
                    className={styles["play-orange"]}
                  >
                    <IcPlayOrange />
                  </Link>
                </div>
                <InfinityList songs={item.songList} />
              </div>
            );
          })}
          {!playlists.length && (
            <p className="text-sm text-primaryGray">
              {t("create_new")} playlist to see it here.
            </p>
          )}
        </div>
        <PagingBar
          currentPage={currentPage}
          onClick={setCurrentPage}
          maxPage={Math.max(1, Math.ceil(rowCount / 10))}
        />
      </div>
    </div>
  );
}

export default MyPlaylist;
