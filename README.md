# Nexus Tiers

A Minecraft PvP tier list site with an admin panel, backed by a MySQL database.

## What's new

- **Diamond Pot** kit added alongside NethPot, Sword, Axe, etc. — shows up automatically
  in the category tabs, the tier board, the add/edit player form, and the points table.
- **Autosave to the database.** Every admin action (add player, edit player, delete
  player, reorder within a tier) now saves straight to MySQL through the `/api/players`
  endpoint — you don't need to press a separate "save" button. A small toast in the
  bottom-center of the screen confirms `Saved to database`, or warns you if the server/DB
  couldn't be reached (in which case your edit is still kept in the browser's local
  storage until the connection is back).
- Minor UI polish: a subtle top highlight on the header bar, a slightly punchier active
  tab state, a top accent on the 1st-place podium card, and the new save-status toast.

## Running it locally

1. Install [Node.js](https://nodejs.org) 18+ and a MySQL server (local install, Docker,
   or a free hosted instance — see "Hosting the database" below).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file and fill in your real database credentials:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env`:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=nexus_tiers
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000`. On first run, the server creates the `players` table
   automatically and seeds it from `players-data.js` — after that, `players-data.js` is
   only used if the table is ever empty again.

## How saving works

- `players-data.js` is the **seed** list — it's only read once, the very first time the
  `players` table is empty.
- After that, everything goes through MySQL: `GET /api/players` loads the roster, and
  `POST /api/players` (called automatically by the admin panel) overwrites it with the
  current list. This is real server-side storage, not just the admin's browser.
- A copy is also kept in the browser's `localStorage` purely as an offline fallback, so
  the page still works if the server is briefly unreachable.

## Adding another kit/gamemode later

In `script.js`, add the kit's name to the `CATEGORIES` array near the top, give it an
entry in `KIT_TEXTURES` (a Minecraft item texture name) and, if you want a hand-drawn
fallback icon, an entry in `ICON_GRIDS`/`ICON_COLORS`. Everything else — the tab button
in `index.html`, the tier board, the add/edit form, and scoring — reads from that array
automatically. (You'll still want to add a tab `<button>` in `index.html` like the
existing `cat-btn` ones.)

## Putting this on GitHub

```bash
git init
git add .
git commit -m "Nexus Tiers"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`.env` is already excluded via `.gitignore` so your real DB password never gets
committed — only `.env.example` (the template) is tracked.

## Deploying somewhere with a real database

Any host that runs Node.js and gives you (or lets you attach) a MySQL database works.
Two straightforward options:

- **Railway** (railway.app) — "New Project" → "Deploy from GitHub repo" → add a MySQL
  plugin from the same dashboard → copy the MySQL plugin's connection details into your
  project's environment variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`,
  `DB_NAME`) → Railway runs `npm install` and `npm start` for you.
- **Render** (render.com) — create a "Web Service" from your GitHub repo (build command
  `npm install`, start command `npm start`), and a separate managed MySQL database (Render
  or an add-on like PlanetScale/Aiven both work) → copy its credentials into Render's
  environment variable settings for the web service.

In both cases you never commit real credentials — you paste them into the host's
"Environment Variables" panel, and `server.js` picks them up the same way it does from
your local `.env` file.

## A note on the admin login

The admin username/password in `script.js` are only a client-side gate to hide the edit
controls from casual visitors — anyone who opens browser dev tools can see them. That's
fine for keeping the UI tidy for a small community project, but don't treat it as real
authentication if this ever needs to be locked down for strangers.
