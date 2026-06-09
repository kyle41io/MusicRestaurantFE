# Music Restaurant Frontend

Next.js frontend for Music Restaurant.

- Production frontend: `https://music-restaurant-fe.vercel.app`
- Backend API: `https://music-restaurant-be.vercel.app`
- API contract: [API_CONTRACT.md](./API_CONTRACT.md)

## Local Requirements

- Node.js
- npm
- The backend project running on `http://localhost:3001`
- Firebase config values for optional image uploads

## Environment

Create/update `.env` in this folder:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_YOUTUBE_API_KEY=optional_youtube_key_if_frontend_search_is_used
```

Important:
- Local frontend runs on `http://localhost:3000`.
- Local backend runs on `http://localhost:3001`.
- `NEXT_PUBLIC_BASE_URL` must point to the backend, not the frontend.
- Avatar upload is optional. If Firebase Storage fails, sign up still continues without an uploaded avatar.
- Do not commit real API keys unless this repository is intentionally public-safe.

## Vercel Deployment

Set this environment variable in the frontend Vercel project:

```env
NEXT_PUBLIC_BASE_URL=https://music-restaurant-be.vercel.app
```

The frontend also has a runtime fallback to the production backend URL when it is running outside localhost, but the Vercel env value should still be set explicitly.

## Run Locally

Install dependencies:

```bash
npm ci
```

Start the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Run With Backend

In another terminal, start the backend from the sibling backend folder:

```bash
cd ../MusicRestaurantBE
docker compose up -d db
npm run dev
```

Then start this frontend:

```bash
cd ../MusicRestaurantFE
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

Current status:
- Frontend lint/build passes.
- Existing lint warnings remain around React hook dependencies and `<img>` usage.

## Current API Flow

The frontend should call backend APIs through files in `src/api`.

Core working flows:
- Sign up: `POST /api/auth/new` with `name`, `username`, `password`, and optional `image`
- Sign in: `POST /api/auth`
- Get users/profile: `GET /api/users/all`, `GET /api/users/:id`
- Search music candidates: `GET /api/musics?search=&page=`
- Create playlist with selected YouTube songs: `POST /api/playlists`
- List playlists: `GET /api/playlists?page=&sort=`
- List user playlists: `GET /api/users/:userId/playlists?page=&sort=`
- Play playlist: `/music-detail?playlistId=<id>` uses embedded YouTube playback

See [API_CONTRACT.md](./API_CONTRACT.md) for the full expected backend contract.

## Audio Strategy

New playlist songs are saved as YouTube song metadata and played through an embedded YouTube player.

The old backend flow tried to convert YouTube to MP3 and store files locally. That is not reliable on Vercel serverless because local files are not persistent. If the app needs MP3 files later, use one of these product-safe paths:
- upload owned/licensed audio files to durable storage such as Firebase Storage/S3/R2, or
- use a background worker plus durable storage for audio the app is allowed to process.
