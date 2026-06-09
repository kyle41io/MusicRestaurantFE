# Music Restaurant API Contract

This file is the frontend source of truth for backend API requirements.

Base URL:
- Local frontend: `NEXT_PUBLIC_BASE_URL=http://localhost:3001`
- Production frontend should point to the backend deployment, for example `https://music-restaurant-be.vercel.app`

Response convention:
- Success responses should be JSON.
- Error responses should be JSON in the shape `{ "message": "..." }`.
- Authenticated write endpoints should accept `Authorization: Bearer <token>` once auth is fully enforced.

## Auth

| API route | Method | Parameters | Request body | Response body | Description | Backend status |
| --- | --- | --- | --- | --- | --- | --- |
| `/api/auth` | `POST` | None | `{ "username": "string", "password": "string" }` | `{ "token": "string", "userId": number }` | Sign in and return a JWT plus user id. | Exists and tested locally |
| `/api/auth/new` | `POST` | None | `{ "name": "string", "username": "string", "password": "string", "image": "string" }` | `{ "id": number, "name": "string", "username": "string", "avatar": "string" }` | Create a user account. `image` is a Firebase/public avatar URL. | Exists and tested locally |

## Users

| API route | Method | Parameters | Request body | Response body | Description | Backend status |
| --- | --- | --- | --- | --- | --- | --- |
| `/api/users/all` | `GET` | None | None | `Array<{ "id": number, "name": "string", "username": "string", "avatar": "string" }>` | Get users for top-member/profile display. Must not include passwords. | Exists and tested locally |
| `/api/users/:id` | `GET` | Path: `id` | None | `{ "id": number, "name": "string", "username": "string", "avatar": "string" }` | Get the signed-in user's display/profile data. Must not include password. | Exists |
| `/api/users` | `PUT` | Header: `Authorization` | `{ "name": "string", "username": "string", "password": "string", "image": "string" }` | `{ "id": number, "name": "string", "username": "string", "avatar": "string" }` | Update current user's profile. | Exists but frontend save flow is not wired yet |

## Music Search And Playback

| API route | Method | Parameters | Request body | Response body | Description | Backend status |
| --- | --- | --- | --- | --- | --- | --- |
| `/api/musics` | `GET` | Query: `search`, `page` | None | `{ "data": Array<YouTubeSearchResult>, "page": number, "rowCount": number }` | Search YouTube music candidates under the app duration limit. Used by playlist creation. | Exists and tested locally |
| `/api/musics/:songId` | `GET` | Path: `songId` | None | `{ "youtubeId": "string", "title": "string", "artist": "string", "image": "string", "duration": "string" }` | Old prepare/download route. Not used by current frontend playback. | Existing implementation depends on unavailable conversion service/local files |
| `/api/streams/:songId` | `GET` | Path: `songId` | None | Audio stream, redirect, or `{ "streamUrl": "string" }` | Old MP3 stream route. Not used by current frontend playback. | Exists, but currently requires prior local download |

## Playlists

| API route | Method | Parameters | Request body | Response body | Description | Backend status |
| --- | --- | --- | --- | --- | --- | --- |
| `/api/playlists` | `GET` | Query: `page`, `sort` | None | `{ "data": Array<Playlist>, "rowCount": number }` | Get latest/top playlists for homepage. | Exists and tested locally |
| `/api/users/:userId/playlists` | `GET` | Path: `userId`; Query: `page`, `sort` | None | `{ "data": Array<Playlist>, "rowCount": number }` | Get playlists owned by one user. | Exists and tested locally |
| `/api/playlists/:id` | `GET` | Path: `id` | None | `Playlist` | Get one playlist by id for detail/playback. | Exists and tested locally |
| `/api/playlists` | `POST` | Optional header: `Authorization` | `{ "playlistName": "string", "songList": SerializedPlaylistSong[], "userId": number, "image": "string" }` | `Playlist` | Create a playlist from selected YouTube songs. | Exists and tested locally |
| `/api/playlists/:id` | `PUT` | Path: `id`; Header: `Authorization` | `{ "playlistName": "string", "songList": string[], "image": "string" }` | `{ "message": "string" }` | Update a playlist owned by the signed-in user. | Exists; still needs frontend flow verification |
| `/api/playlists/:id` | `DELETE` | Path: `id`; Header: `Authorization` | None | `{ "message": "string" }` | Delete a playlist owned by the signed-in user. | Exists |

`Playlist` shape:

```json
{
  "id": 1,
  "playlistName": "Local Playlist",
  "userId": 1,
  "view": 0,
  "image": "https://example.com/playlist.png",
  "songList": [
    "{\"youtubeId\":\"fN1Cyr0ZK9M\",\"title\":\"Song title\",\"thumbnail\":\"https://i.ytimg.com/vi/fN1Cyr0ZK9M/hqdefault.jpg\",\"channelTitle\":\"Artist/channel\",\"playbackUrl\":\"https://www.youtube.com/watch?v=fN1Cyr0ZK9M\",\"embedUrl\":\"https://www.youtube.com/embed/fN1Cyr0ZK9M\",\"source\":\"youtube\"}"
  ],
  "createdAt": "2026-06-08T15:50:22.784Z",
  "updatedAt": "2026-06-08T15:50:22.784Z"
}
```

`SerializedPlaylistSong` is a JSON string stored in the Postgres `text[]` `songList` column. The frontend normalizes both the new JSON-string format and older bare YouTube id strings.

## Comments

| API route | Method | Parameters | Request body | Response body | Description | Backend status |
| --- | --- | --- | --- | --- | --- | --- |
| `/api/comments` | `GET` | Query: `playlistId`, `page`, `sort` | None | `{ "data": Array<Comment>, "rowCount": number, "page": number }` | Get comments for a playlist. | Exists and tested locally |
| `/api/comments` | `POST` | Header: `Authorization` | `{ "playlistId": number, "content": "string" }` | `Comment` | Create a comment as the signed-in user. | Exists, auth mutation path should be verified |
| `/api/comments/:id` | `PUT` | Path: `id`; Header: `Authorization` | `{ "playlistId": number, "content": "string" }` | `{ "message": "string" }` or `Comment` | Edit a comment owned by the signed-in user. | Exists; still needs frontend flow verification |
| `/api/comments/:id` | `DELETE` | Path: `id`; Header: `Authorization` | None | `{ "message": "string" }` | Delete a comment. | Exists |

`Comment` shape:

```json
{
  "id": 1,
  "playlistId": 1,
  "userId": 1,
  "content": "Great playlist",
  "createdAt": "2026-06-08T15:50:22.784Z",
  "updatedAt": "2026-06-08T15:50:22.784Z"
}
```

## Likes

| API route | Method | Parameters | Request body | Response body | Description | Backend status |
| --- | --- | --- | --- | --- | --- | --- |
| `/api/likes` | `GET` | Query: `playlistId`, `page`, `sort` | None | `{ "data": Array<Like>, "rowCount": number, "page": number }` | Get likes for a playlist. | Exists and tested locally |
| `/api/likes` | `POST` | Header: `Authorization` | `{ "playlistId": number }` | `Like` | Like a playlist as the signed-in user. | Exists, auth mutation path should be verified |
| `/api/likes/:id` | `DELETE` | Path: `id`; Header: `Authorization` | None | `{ "message": "string" }` | Remove a like. | Exists |

`Like` shape:

```json
{
  "id": 1,
  "playlistId": 1,
  "userId": 1
}
```

## Production Playback Decision

The current backend conversion flow depends on a third-party YouTube-to-MP3 service and local MP3 files. That is not reliable on Vercel serverless because local files are not persistent. It also raises YouTube terms/compliance risk when converting videos the user does not own.

Recommended production options:
- Store YouTube ids and play through an allowed YouTube playback experience.
- Let users upload licensed/owned audio files, store them in Firebase Storage/S3/R2, and save the public or signed stream URL.
- Use a background worker plus durable object storage only for audio the app is allowed to process.
