const MY_PLAYLIST_MOCK = [
  {
    no: 1,
    name_song: "anh di roi oooo111",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 2,
    name_song: "anh di roi oooo222",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 3,
    name_song: "anh di roi oooo333",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 4,
    name_song: "anh di roi oooo444",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 5,
    name_song: "anh di roi oooo555",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 6,
    name_song: "anh di roi oooo666",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 7,
    name_song: "anh di roi oooo777",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 8,
    name_song: "anh di roi oooo888",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 9,
    name_song: "anh di roi oooo999",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 10,
    name_song: "anh di roi oooo101010",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 11,
    name_song: "anh di roi oooo11 11 11",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 12,
    name_song: "anh di roi oooo12",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 13,
    name_song: "anh di roi oooo13",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 14,
    name_song: "anh di roi oooo14",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 15,
    name_song: "anh di roi oooo15",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 16,
    name_song: "anh di roi oooo16",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 17,
    name_song: "anh di roi oooo17",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 18,
    name_song: "anh di roi oooo18",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 19,
    name_song: "anh di roi oooo19",
    author_song: "Author",
    views_song: 10002,
  },
  {
    no: 20,
    name_song: "anh di roi ooo20",
    author_song: "Author",
    views_song: 10002,
  },
];

export const getList = (segment, number) => {
  return {
    length: MY_PLAYLIST_MOCK.length,
    list: MY_PLAYLIST_MOCK.slice(segment * number, (segment + 1) * number),
  };
};
