import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getNewPlaylist } from "@/api/apiPlaylist";

import PagingBar from "@/components/shared/PagingBar";
import CommonTable from "@/components/shared/CommonTable";

import styles from "@/styles/content/home/NewPlaylist.module.css";

const tableHeader = [
  {
    label: "no",
    key: "no",
  },
  {
    label: "song",
    key: "song",
  },
  {
    label: "author",
    key: "author",
  },
  {
    label: "genre",
    key: "genre",
  },
  {
    label: "tracks",
    key: "tracks",
  },
  {
    label: "",
    key: "isPlaying",
  },
];

function NewPlaylist() {
  const t = useTranslations("Home");

  const [currentPage, setCurrentPage] = useState(1);
  const [playingIndex, setPlayingIndex] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await getNewPlaylist({ page: currentPage });
        setPlaylists(response.data?.data || []);
        setRowCount(response.data?.rowCount || 0);
      } catch (error) {
        console.error("Error fetching playlists", error);
        setPlaylists([]);
        setRowCount(0);
      }
    };

    fetchPlaylists();
  }, [currentPage]);

  return (
    <div className={styles["main-container"]}>
      <p className={styles.title}>{t("new_playlist")}</p>
      <div className={styles["main-content"]}>
        <CommonTable
          list={playlists}
          headerList={tableHeader}
          playingIndex={playingIndex}
          setPlayingIndex={setPlayingIndex}
        />
        <PagingBar
          currentPage={currentPage}
          onClick={setCurrentPage}
          maxPage={Math.max(1, Math.ceil(rowCount / 6))}
        />
      </div>
    </div>
  );
}

export default NewPlaylist;
