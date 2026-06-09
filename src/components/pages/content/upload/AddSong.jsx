import { useState, useContext } from "react";
import Image from "next/image";
import SearchImage from "@/assets/images/search.png";
import SearchIcon from "@/assets/icons/SearchIcon";
import { FaTrashAlt } from "react-icons/fa";

import FileContext from "@/store/FileProvider";
import { createPlaylist } from "@/api/apiPlaylist";
import { getMusic } from "@/api/apiMusic";
import {
  serializePlaylistSong,
  youtubeEmbedUrl,
  youtubeWatchUrl,
} from "@/utils/playlistSongs";

const SelectedSongs = ({ selectedSongs, setSelectedSongs }) => {
  const handleRemoveSong = (songId) => {
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.filter((song) => song.id !== songId)
    );
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium">Selected Songs:</h3>
      {selectedSongs.map((song) => (
        <div key={song.id} className="mt-2 flex items-center px-2">
          <div className="w-28 h-28 flex justify-center items-center">
            <img
              src={song.thumbnail}
              width="100"
              height="100"
              alt="thumbnail"
              className="rounded-sm"
            />
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium">{song.title}</h4>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveSong(song.id)}
            >
              <FaTrashAlt size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const AddSong = ({ setCurrentStep, setShowToast, setError, t }) => {
  const { infoPlaylist, uploadedImageFile, setCreatedPlaylist } =
    useContext(FileContext);
  const { title } = infoPlaylist;

  const userId = typeof window !== "undefined" ? localStorage.getItem("id") : "";

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${month}-${year}`;
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSearchError("");

    try {
      const response = await getMusic(searchTerm, 1);
      const items = response.data?.data || [];
      const results = items
        .map((item) => {
          const youtubeId = item.id?.videoId || item.videoId || item.id;
          const thumbnail =
            item.snippet?.thumbnails?.medium?.url ||
            item.snippet?.thumbnails?.default?.url ||
            item.snippet?.thumbnails?.url ||
            item.thumbnail;

          return {
            id: youtubeId,
            youtubeId,
            title: item.snippet?.title || item.title,
            thumbnail,
            image: thumbnail,
            playbackUrl: youtubeWatchUrl(youtubeId),
            embedUrl: youtubeEmbedUrl(youtubeId),
            source: "youtube",
            duration: item.duration || item.duration_raw || "",
            channelTitle: item.channel?.name || item.snippet?.channelTitle || "",
            publishedAt: item.snippet?.publishedAt || "",
          };
        })
        .filter((item) => item.youtubeId && item.title);

      setSearchResults(results);
    } catch (error) {
      setSearchError("Can not search YouTube right now. Please try again.");
      console.error("Error searching videos:", error);
    } finally {
      setIsSearching(false);
    }
  };


  const handleAddsong = async () => {
    if (!selectedSongs.length) {
      setError?.(true);
      setShowToast?.(true);
      return;
    }

    const playlistImage =
      typeof uploadedImageFile === "string" &&
      uploadedImageFile.startsWith("http")
        ? uploadedImageFile
        : "";

    const body = {
      playlistName: title,
      songList: selectedSongs.map(serializePlaylistSong),
      userId: Number(userId),
      image: playlistImage,
    };

    try {
      const response = await createPlaylist(body);
      setCreatedPlaylist?.(response.data);
      setCurrentStep(3);
    } catch (error) {
      setError?.(true);
      setShowToast?.(true);
      console.error("Error creating playlist:", error);
    }
  };

  const handleAddSong = (song) => {
    setSelectedSongs((prevSelectedSongs) => {
      if (prevSelectedSongs.some((selectedSong) => selectedSong.id === song.id)) {
        return prevSelectedSongs;
      }
      return [...prevSelectedSongs, song];
    });
    setSearchResults([]);
  };

  return (
    <div>
      <div
        className={`relative flex flex-col justify-between items-center min-h-[740px] w-[645px] p-6 gap-6 rounded-md border border-[#DCDCDC] shadow-[0px_0px_8px_0px_rgba(51,51,51,0.10)]`}
      >
        <div className="w-full relative">
          <input
            className="w-full h-11 rounded-md pl-4 pr-14 py-2 border border-[#DCDCDC]"
            placeholder={t("search_song_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="absolute flex justify-center items-center rounded-md right-5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer w-7 h-7 z-0opacity-50"
            onClick={handleSearch}
            disabled={isSearching}
          >
            <SearchIcon />
          </button>
        </div>

        {searchError && (
          <p className="w-full text-left text-xs text-red-500">{searchError}</p>
        )}

        {searchResults.length > 0 && (
          <div className="absolute top-16 w-full mt-4 bg-white">
            <div className="w-full rounded-md border">
              {searchResults.map((result, index) => (
                <div
                  className="flex justify-start gap-3  items-center min-h-24 w-full border hover:bg-slate-300 border-t-[#DCDCDC]"
                  key={index}
                  onClick={() => handleAddSong(result)}
                >
                  <div className="w-28 h-28 flex justify-center items-center">
                    <img
                      src={result.thumbnail}
                      width="100"
                      height="100"
                      alt="thumbnail"
                      className="rounded-sm"
                    />
                  </div>
                  <div className="">
                    {result.title}
                    <div className="text-gray-700 flex gap-2">
                      <div className="">{result.channelTitle}</div>
                      <div className="">{formatDate(result.publishedAt)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="">
          <Image src={SearchImage} alt="" width={200} height={200} />
          {isSearching && (
            <p className="text-center text-xs text-primaryGray mt-2">
              Searching YouTube...
            </p>
          )}
        </div>

        <div className="w-full flex justify-end text-sm gap-2">
          <button
            className="px-3 py-1 rounded hover:bg-slate-300"
            onClick={() => setCurrentStep(1)}
          >
            {t("back")}
          </button>
          <button
            className="px-3 py-1 bg-primary hover:bg-orange-700 rounded p-2 text-white"
            onClick={handleAddsong}
          >
            {t("save")}
          </button>
        </div>
      </div>
      <SelectedSongs
        selectedSongs={selectedSongs}
        setSelectedSongs={setSelectedSongs}
      />
    </div>
  );
};
export default AddSong;
