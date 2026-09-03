# Pomodoro

A Pomodoro-style focus timer with a task list, ambient lofi radio, and light/dark themes.

Built with React 19, TanStack Start/Router/Query, and Tailwind CSS v4.

## Features

- **Timer** — work/break cycle with a visual progress ring and controls, driven by a persisted `zustand` store.
- **Tasks** — a simple task list to track what you're working on during a session.
- **Lofi radio** — an embedded lofi live-stream player with a channel picker, backed by a small catalog of channels.
- **Themes** — light/dark theming that follows the current timer phase.
- **Settings** — a dialog for configuring timer durations and preferences.

## Development

Install dependencies, then:

```sh
npm run dev        # start the dev server (http://localhost:8080)
npm run build      # production build (also runs DB migrations)
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm run format     # Prettier
npm test           # run scripts/**/*.test.mjs
```

### Static / GitHub Pages build

```sh
npm run build:pages
```

Fetches the current lofi live-stream list, builds with `GITHUB_PAGES=1`, and post-processes the output for GitHub Pages hosting.

## Project layout

- `src/routes/` — TanStack Router routes (file-based)
- `src/components/` — UI components (timer, tasks, lofi embed, theming, settings)
- `src/lib/` — timer/task state, lofi catalog and live-stream fetching, auth/db helpers
- `server/` — server middleware
- `migrations/` — SQL migrations (Postgres via Kysely / pglite); auth-related tables live under `migrations/auth/`

Authentication (`better-auth`) and Postgres are wired into the project but are **opt-in** — the app runs with local-only state (via `zustand`/`localStorage`) unless auth routes are added.

## License

MIT — see [LICENSE](LICENSE).
