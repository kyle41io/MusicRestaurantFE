import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import SearchImage from "@/assets/images/search.png";
import SearchIcon from "@/assets/icons/SearchIcon";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

import FileContext from "@/store/FileProvider";

const SelectedSongs = ({ selectedSongs, setSelectedSongs }) => {
  const [songDetails, setSongDetails] = useState([]);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              id: selectedSongs.join(","),
              part: "snippet",
              key: `${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
            },
          }
        );

        const items = response.data.items;
        const details = items.map((item) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));

        setSongDetails(details);
      } catch (error) {
        console.error("Error fetching song details:", error);
      }
    };

    if (selectedSongs.length > 0) {
      fetchSongDetails();
    } else {
      setSongDetails([]);
    }
  }, [selectedSongs]);

  const handleRemoveSong = (songId) => {
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.filter((id) => id !== songId)
    );
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium">Selected Songs:</h3>
      {songDetails.map((song) => (
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
  const { infoPlaylist, uploadedImageFile } = useContext(FileContext);
  const { title, artist, genre, ref } = infoPlaylist;

  if (typeof window !== 'undefined') {var userId = localStorage.getItem("id");}

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${month}-${year}`;
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            q: searchTerm,
            part: "snippet",
            type: "video",
            videoCategoryId: 10,
            maxResults: 5,
            videoDuration: "medium",
            key: `${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
          },
        }
      );

      const items = response.data.items;
      const results = items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
      }));

      setSearchResults(results);
    } catch (error) {
      console.error("Error searching videos:", error);
      // Handle error
    }
  };


  const handleAddsong = async () => {
    const body = {
      playlistName: title,
      songList: selectedSongs,
      userId: userId,
      image: uploadedImageFile
    };

    let responsePlaceHolder = {};

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        responsePlaceHolder = response;
        return response.json();
      })

      setCurrentStep(3)
  };

  const handleAddSong = (songId) => {
    setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, songId]);
    setSearchResults([]);
  };

  useEffect(() => {
    return () => {
      console.log(selectedSongs);
    };
  });

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
          >
            <SearchIcon />
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="absolute top-16 w-full mt-4 bg-white">
            <div className="w-full rounded-md border">
              {searchResults.map((result, index) => (
                <div
                  className="flex justify-start gap-3  items-center min-h-24 w-full border hover:bg-slate-300 border-t-[#DCDCDC]"
                  key={index}
                  onClick={() => handleAddSong(result.id)}
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
