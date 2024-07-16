import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";

import { NEW_PLAYLIST, tableHeader } from "@/constants/newplaylist";

import PagingBar from "@/components/shared/PagingBar";
import CommonTable from "@/components/shared/CommonTable";

import styles from "@/styles/content/home/NewPlaylist.module.css";

function NewPlaylist() {
  const t = useTranslations("Home");

  const [currentPage, setCurrentPage] = useState(1);
  const [playingIndex, setPlayingIndex] = useState();
  const [songDetails, setSongDetails] = useState([]);
  const [songLists, setSongLists] = useState([]);


  // useEffect(() => {
  //   const fetchSongDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://www.googleapis.com/youtube/v3/videos",
  //         {
  //           params: {
  //             id: songList.join(","),
  //             part: "snippet",
  //             key: `${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
  //           },
  //         }
  //       );

  //       const items = response.data.items;
  //       const details = items.map((item) => ({
  //         id: item.id,
  //         title: item.snippet.title,
  //         thumbnail: item.snippet.thumbnails.medium.url,
  //       }));

  //       setSongDetails(details);
  //     } catch (error) {
  //       console.error("Error fetching song details:", error);
  //     }
  //   };

  //   if (songLists.length > 0) {
  //     fetchSongDetails();
  //   } else {
  //     setSongDetails([]);
  //   }
  // });

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/playlists/5`
  //       );
  
  //       const items = response.data;
  //       const details = items.map((item) => ({
  //         playlistName: item.playlistName,
  //         view: item.view,
  //         image: item.image,
  //         songList: item.songList
  //       }));
  
  //       setUsers(details);
  //     } catch (error) {
  //       console.error("Error fetching users", error);
  //     }
  //   };
  
  //   fetchUserDetails();
  // }, []);

  return (
    <div className={styles["main-container"]}>
      <p className={styles.title}>{t("new_playlist")}</p>
      <div className={styles["main-content"]}>
        <CommonTable
          list={NEW_PLAYLIST}
          headerList={tableHeader}
          playingIndex={playingIndex}
          setPlayingIndex={setPlayingIndex}
        />
        <PagingBar
          currentPage={currentPage}
          onClick={setCurrentPage}
          maxPage={12}
        />
      </div>
    </div>
  );
}

export default NewPlaylist;
