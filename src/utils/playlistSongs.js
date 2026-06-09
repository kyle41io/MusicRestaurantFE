const fallbackThumbnail = (youtubeId) =>
  youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : "";

export const youtubeWatchUrl = (youtubeId) =>
  youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : "";

export const youtubeEmbedUrl = (youtubeId) =>
  youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : "";

export const normalizePlaylistSong = (entry, index = 0) => {
  let song = entry;

  if (typeof entry === "string") {
    try {
      song = JSON.parse(entry);
    } catch {
      song = { youtubeId: entry };
    }
  }

  const youtubeId = song?.youtubeId || song?.id || song?.videoId || "";
  const title = song?.title || song?.songName || "Untitled YouTube song";
  const singer = song?.channelTitle || song?.singer || song?.artist || "YouTube";
  const image = song?.thumbnail || song?.image || fallbackThumbnail(youtubeId);

  return {
    ...song,
    id: youtubeId,
    index,
    youtubeId,
    title,
    songName: title,
    singer,
    image,
    thumbnail: image,
    playbackUrl: song?.playbackUrl || youtubeWatchUrl(youtubeId),
    embedUrl: song?.embedUrl || youtubeEmbedUrl(youtubeId),
  };
};

export const serializePlaylistSong = (song) => {
  const normalized = normalizePlaylistSong(song);

  return JSON.stringify({
    youtubeId: normalized.youtubeId,
    title: normalized.title,
    thumbnail: normalized.thumbnail,
    channelTitle: normalized.channelTitle || normalized.singer,
    publishedAt: normalized.publishedAt || "",
    playbackUrl: normalized.playbackUrl,
    embedUrl: normalized.embedUrl,
    source: "youtube",
  });
};
