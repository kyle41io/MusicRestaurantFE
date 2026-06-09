"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AlbumItem from "@/components/pages/content/music-detail/AlbumItem";
import Information from "@/components/pages/content/music-detail/Information";
import ListAction from "@/components/layouts/HeaderComponents/ListAction";
import MusicPlayer from "@/components/pages/content/music-detail/MusicPlayer";
import { getPlaylist } from "@/api/apiPlaylist";
import { normalizePlaylistSong } from "@/utils/playlistSongs";

const DetailMusic = () => {
  const searchParams = useSearchParams();
  const playlistId = searchParams.get("playlistId");

  const [playlist, setPlaylist] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(playlistId));
  const [error, setError] = useState("");

  const tracks = useMemo(() => {
    return (playlist?.songList || []).map(normalizePlaylistSong);
  }, [playlist?.songList]);

  useEffect(() => {
    if (!playlistId) {
      setError("Missing playlist id.");
      setIsLoading(false);
      return;
    }

    const fetchPlaylist = async () => {
      try {
        setIsLoading(true);
        const response = await getPlaylist(playlistId);
        setPlaylist(response.data);
        setError("");
      } catch (err) {
        setError("Can not load this playlist.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  useEffect(() => {
    if (tracks.length && !selectedTrack) {
      setSelectedTrack(tracks[0]);
    }
  }, [tracks, selectedTrack]);

  const handlePlayTrack = (track) => {
    setSelectedTrack(track);
  };

  if (isLoading) {
    return <div className="text-primaryGray">Loading playlist...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex mx-auto gap-[4%]">
      <div className="w-[64%] flex flex-col gap-6">
        <MusicPlayer track={selectedTrack} playlist={playlist} />
        <ListAction />
        <Information playlist={playlist} tracks={tracks} />
      </div>
      <div className="w-[32%] flex flex-col border border-secondaryGray rounded">
        {tracks.map((track, idx) => (
          <AlbumItem
            key={track.youtubeId || idx}
            track={track}
            index={idx}
            isPlaying={selectedTrack?.youtubeId === track.youtubeId}
            setIsPlaying={() => handlePlayTrack(track)}
          />
        ))}
      </div>
    </div>
  );
};

export default DetailMusic;
