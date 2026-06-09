# Repository Guidelines

## Project Overview
- This is a Next.js 13 frontend for "Music Restaurant" using the App Router under `src/app/[locale]`.
- The UI is React 18 with Tailwind CSS, CSS modules, and some plain CSS files.
- Internationalization is handled by `next-intl` with `en` and `vi` message files in `src/messages`.
- API requests use the shared Axios instance in `src/lib/axios.js`, with `NEXT_PUBLIC_BASE_URL` as the backend base URL.

## Common Commands
- `npm run dev` starts the local Next.js development server.
- `npm run build` creates a production build.
- `npm run start` serves the production build after a successful build.
- `npm run lint` runs Next.js linting.

## Project Structure
- `src/app/[locale]` contains route files and locale-aware layouts.
- `src/components/pages` contains page-specific UI for auth, home, upload, and music detail flows.
- `src/components/layouts` contains shared layout pieces such as header, footer, and user modal.
- `src/components/shared` contains reusable UI components.
- `src/api` contains API wrapper modules grouped by backend resource.
- `src/hooks` contains client-side React hooks for auth, upload, songs, volume, and text areas.
- `src/store` contains React context providers.
- `src/styles` contains global CSS, CSS modules, and feature-specific styles.
- `src/assets` contains icons and images imported by components.

## Coding Conventions
- Use the `@/*` import alias for files under `src`.
- Most interactive components are client components; preserve existing `"use client"` directives when editing these files.
- Keep route paths with square brackets quoted in zsh commands, for example `sed -n '1,120p' 'src/app/[locale]/layout.jsx'`.
- Prefer existing shared components, hooks, API modules, and style patterns before introducing new abstractions.
- Keep styling consistent with the existing Tailwind palette in `tailwind.config.js` and the current mix of Tailwind classes, CSS modules, and feature CSS.
- When adding text shown to users, update both `src/messages/en.json` and `src/messages/vi.json` where appropriate.

## Notes And Gotchas
- Auth flow currently relies on `localStorage.getItem("token")` and redirects unauthenticated users to `/auth/sign-in`.
- The root localized page renders the home page.
- `src/components/shared/Button.jsx` builds dynamic Tailwind class names from color props; if adding colors, keep Tailwind safelisting in mind.
- `README.md` is still the default create-next-app README and may not reflect the actual app structure.

## Verification
- Run `npm run lint` for basic static checks after code changes.
- Run `npm run build` for broader verification when changing routes, layouts, config, i18n, or shared components.
